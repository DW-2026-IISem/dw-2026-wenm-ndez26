"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthUser = requireAuthUser;
const app_error_1 = require("../errors/app-error");
/**
 * Devuelve la identidad de la petición o falla con 401.
 *
 * Lo usan los controllers de rutas con modalidad JWT (sin `authorize`): allí el
 * middleware ya garantizó que `req.auth` existe, pero el tipo es opcional, así
 * que esta función cierra el caso sin recurrir a `!`.
 */
function requireAuthUser(req) {
    if (!req.auth) {
        throw new app_error_1.AppError(401, "Authentication required");
    }
    return req.auth;
}
//# sourceMappingURL=auth-user.js.map