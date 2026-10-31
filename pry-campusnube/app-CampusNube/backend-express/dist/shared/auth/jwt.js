"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_TOKEN_TTL_SECONDS = exports.TOKEN_AUDIENCE = exports.TOKEN_ISSUER = void 0;
exports.signAccessToken = signAccessToken;
exports.verifyAccessToken = verifyAccessToken;
exports.extractBearerToken = extractBearerToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_crypto_1 = require("node:crypto");
const app_error_1 = require("../errors/app-error");
/**
 * Emisión y verificación del **access token** (JWT firmado, HS256).
 *
 * Referencias (fuentes oficiales):
 *  - RFC 7519 — JSON Web Token (`sub`, `iss`, `aud`, `exp`, `iat`, `jti`).
 *  - RFC 8725 §3.1 — *Perform Algorithm Verification*: el algoritmo se fija en el
 *    código (lista permitida), nunca se toma del encabezado `alg` del token.
 *  - RFC 8725 §3.8/§3.9 — validar `iss` (emisor) y `aud` (audiencia).
 *  - RFC 6750 — el token viaja en `Authorization: Bearer <token>`.
 *
 * El access token es **autocontenido y no se persiste**: se valida con la firma.
 * La base de datos solo interviene para revalidar que el usuario sigue activo
 * (ver `authenticate`), y para los refresh tokens.
 */
const ALGORITHM = "HS256";
/** Emisor/audiencia del sistema. */
exports.TOKEN_ISSUER = "app-campusnube-express";
exports.TOKEN_AUDIENCE = "app-campusnube-api";
/** Vida útil del access token. */
exports.ACCESS_TOKEN_TTL_SECONDS = Number(process.env.JWT_ACCESS_TTL ?? 900);
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new app_error_1.AppError(500, "JWT_SECRET no configurado (mínimo 32 caracteres). Ver .env");
    }
    return secret;
}
/** Firma un access token para un usuario. */
function signAccessToken(user) {
    const token = jsonwebtoken_1.default.sign({ username: user.username }, getSecret(), {
        algorithm: ALGORITHM,
        subject: String(user.id),
        issuer: exports.TOKEN_ISSUER,
        audience: exports.TOKEN_AUDIENCE,
        expiresIn: exports.ACCESS_TOKEN_TTL_SECONDS,
        jwtid: (0, node_crypto_1.randomUUID)(),
    });
    return {
        token,
        expiresIn: exports.ACCESS_TOKEN_TTL_SECONDS,
    };
}
/**
 * Verifica firma y claims y devuelve el payload.
 */
function verifyAccessToken(token) {
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, getSecret(), {
            algorithms: [ALGORITHM],
            issuer: exports.TOKEN_ISSUER,
            audience: exports.TOKEN_AUDIENCE,
            clockTolerance: 5,
        });
    }
    catch {
        throw new app_error_1.AppError(401, "Invalid or expired access token");
    }
    if (typeof payload.sub !== "string" ||
        !/^[1-9]\d*$/.test(payload.sub) ||
        typeof payload.jti !== "string" ||
        payload.jti.length === 0) {
        throw new app_error_1.AppError(401, "Invalid or expired access token");
    }
    return payload;
}
/** Extrae el token de `Authorization: Bearer <token>`. */
function extractBearerToken(header) {
    if (!header)
        return null;
    const [scheme, value] = header.split(" ");
    if (!scheme ||
        !value ||
        scheme.toLowerCase() !== "bearer") {
        return null;
    }
    return value;
}
//# sourceMappingURL=jwt.js.map