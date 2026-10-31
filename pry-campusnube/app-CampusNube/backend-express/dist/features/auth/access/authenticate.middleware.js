"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const app_error_1 = require("../../../shared/errors/app-error");
const error_response_1 = require("../../../shared/http/error-response");
const jwt_1 = require("../../../shared/auth/jwt");
require("../../../shared/auth/auth-user");
const users_repository_1 = require("../users/users.repository");
/**
 * **MODALIDAD 2 — JWT (identidad).** Middleware de autenticación.
 *
 * Responde únicamente a la pregunta **¿quién eres?**:
 *
 *  1. Lee el token de `Authorization: Bearer <token>` (RFC 6750).
 *  2. Verifica firma, algoritmo, `iss`, `aud`, `exp` (RFC 8725).
 *  3. **Revalida contra la base de datos** que el usuario sigue existiendo y con
 *     `status = active`. Un token firmado sigue siendo válido después de
 *     desactivar la cuenta; esta revalidación hace que la desactivación tenga
 *     efecto inmediato.
 *
 * NO consulta la matriz de permisos: eso es responsabilidad de `authorize`.
 * Si todo va bien, deja la identidad en `req.auth` y cede el paso.
 *
 * Cualquier fallo se responde con **401 (no autenticado)**.
 */
const usersRepository = new users_repository_1.UsersRepository();
async function authenticate(req, res, next) {
    try {
        const token = (0, jwt_1.extractBearerToken)(req.headers.authorization);
        if (!token) {
            throw new app_error_1.AppError(401, "Missing Bearer token");
        }
        const payload = (0, jwt_1.verifyAccessToken)(token);
        // Defensa en profundidad: `verifyAccessToken` ya garantiza que `sub` es un
        // entero positivo. Se vuelve a comprobar para que ningún cambio futuro en la
        // verificación pueda enviar un `NaN` al repositorio (500 en vez de 401).
        const userId = Number(payload.sub);
        if (!Number.isInteger(userId) || userId < 1) {
            throw new app_error_1.AppError(401, "Invalid or expired access token");
        }
        const user = await usersRepository.findById(userId);
        if (!user || user.status !== "active") {
            throw new app_error_1.AppError(401, "User is not active");
        }
        req.auth = {
            id: user.id,
            username: user.username,
            email: user.email,
            tokenId: payload.jti,
        };
        next();
    }
    catch (error) {
        (0, error_response_1.sendError)(res, error);
    }
}
//# sourceMappingURL=authenticate.middleware.js.map