"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensService = void 0;
const node_crypto_1 = require("node:crypto");
const dto_1 = require("./dto");
const refresh_tokens_repository_1 = require("./refresh-tokens.repository");
const app_error_1 = require("../../../shared/errors/app-error");
const password_1 = require("../../../shared/auth/password");
const with_transaction_1 = require("../../../shared/database/with-transaction");
const REFRESH_TTL_DAYS = Number(process.env.JWT_REFRESH_TTL_DAYS ?? 7);
class RefreshTokensService {
    constructor(repository = new refresh_tokens_repository_1.RefreshTokensRepository()) {
        this.repository = repository;
    }
    // ================== GESTIÓN DE SESIONES PROPIAS ==================
    async getAllMine(userId) {
        const tokens = await this.repository.findAllByUser(userId);
        return tokens.map((token) => (0, dto_1.toRefreshTokenResponse)(token));
    }
    async getMine(userId, id) {
        return (0, dto_1.toRefreshTokenResponse)(await this.findMineOrFail(userId, id));
    }
    async revokeMine(userId, id) {
        const token = await this.findMineOrFail(userId, id);
        await this.repository.update(token, {
            status: "inactive",
        });
        return (0, dto_1.toRefreshTokenResponse)(token);
    }
    async revokeAllMine(userId) {
        return this.repository.revokeAllByUser(userId);
    }
    async purgeMine(userId) {
        return this.repository.purgeInactiveByUser(userId);
    }
    async countActiveMine(userId) {
        return this.repository.countActiveByUser(userId);
    }
    // ================== CICLO DE VIDA ==================
    async issue(userId, deviceInfo, transaction) {
        const rawToken = (0, password_1.generateOpaqueToken)();
        const familyId = (0, node_crypto_1.randomUUID)();
        const expiresAt = expiryFromNow();
        await this.repository.create({
            user_id: userId,
            token_hash: (0, password_1.sha256Hex)(rawToken),
            family_id: familyId,
            device_info: deviceInfo,
            expires_at: expiresAt,
            status: "active",
        }, transaction);
        return {
            rawToken,
            familyId,
            expiresAt,
        };
    }
    async rotate(rawToken, deviceInfo) {
        const hash = (0, password_1.sha256Hex)(rawToken);
        const outcome = await (0, with_transaction_1.withTransaction)(async (transaction) => {
            const current = await this.repository.findByHash(hash, transaction, true);
            if (!current) {
                return { kind: "invalid" };
            }
            // REUSE DETECTION
            if (current.status !== "active") {
                const revoked = await this.repository.revokeFamily(current.family_id, transaction);
                return {
                    kind: "reuse",
                    familyId: current.family_id,
                    revoked,
                };
            }
            if (new Date(current.expires_at).getTime() <= Date.now()) {
                await this.repository.update(current, { status: "inactive" }, transaction);
                return { kind: "expired" };
            }
            // Rotación
            await this.repository.update(current, { status: "inactive" }, transaction);
            const rawNext = (0, password_1.generateOpaqueToken)();
            const expiresAt = expiryFromNow();
            await this.repository.create({
                user_id: current.user_id,
                token_hash: (0, password_1.sha256Hex)(rawNext),
                family_id: current.family_id,
                device_info: deviceInfo ?? current.device_info,
                expires_at: expiresAt,
                status: "active",
            }, transaction);
            return {
                kind: "rotated",
                userId: current.user_id,
                rawToken: rawNext,
                familyId: current.family_id,
                expiresAt,
            };
        });
        return outcome;
    }
    async revokeByToken(rawToken) {
        const token = await this.repository.findByHash((0, password_1.sha256Hex)(rawToken));
        if (!token) {
            return false;
        }
        if (token.status !== "active") {
            return true;
        }
        await this.repository.update(token, {
            status: "inactive",
        });
        return true;
    }
    async findMineOrFail(userId, id) {
        const token = await this.repository.findById(id);
        if (!token || token.user_id !== userId) {
            throw new app_error_1.AppError(404, "Session not found");
        }
        return token;
    }
}
exports.RefreshTokensService = RefreshTokensService;
function expiryFromNow() {
    return new Date(Date.now() +
        REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
}
//# sourceMappingURL=refresh-tokens.service.js.map