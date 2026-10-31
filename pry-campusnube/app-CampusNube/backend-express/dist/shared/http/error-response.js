"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = sendError;
const app_error_1 = require("../errors/app-error");
/**
 * Traduce cualquier error a una respuesta HTTP. **Único punto** del proyecto
 * donde se decide el mapeo error -> status.
 *
 * Lo usan los dos sitios que pueden fallar antes de llegar a un controller:
 *  - `BaseController.handleError` (handlers de los controllers);
 *  - los middlewares de acceso (`authenticate` / `authorize`), que responden
 *    401/403 sin pasar por un controller.
 *
 * Regla: `AppError` -> su `statusCode`; cualquier otra cosa -> **500** (y el
 * detalle solo en el cuerpo, nunca el stack).
 */
function sendError(res, error) {
    if (error instanceof app_error_1.AppError) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }
    res.status(500).json({ error: "Internal server error", detail: String(error) });
}
//# sourceMappingURL=error-response.js.map