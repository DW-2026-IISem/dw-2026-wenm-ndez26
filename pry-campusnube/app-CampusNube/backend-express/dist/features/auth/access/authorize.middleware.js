"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const app_error_1 = require("../../../shared/errors/app-error");
const error_response_1 = require("../../../shared/http/error-response");
const resource_match_1 = require("../../../shared/auth/resource-match");
const resource_roles_repository_1 = require("../resource-roles/resource-roles.repository");
/**
 * **MODALIDAD 3 — RBAC (identidad + autorización granular).** Middleware de
 * autorización.
 *
 * Debe montarse **después** de `authenticate`. Responde a la segunda pregunta:
 * *¿puede esta identidad ejecutar `method + path`?*
 *
 * Cómo resuelve la decisión:
 *  1. Toma la identidad ya resuelta en `req.auth`.
 *  2. Consulta la **cadena completa** de autorización en la base de datos
 *     (`resource_roles → roles → role_users → resources`, todos los eslabones
 *     activos) para ese `user_id`.
 *  3. Compara el par `(method, path)` de la petición con las concesiones,
 *     por patrón (`/api/productos/:id` casa con `/api/productos/42`).
 *
 * Reglas:
 *  - **Deny by default**: sin concesión activa que cubra la operación -> 403.
 *  - **401** si no hay identidad (falta `authenticate` o el token no valió).
 *  - **403** si hay identidad válida pero no hay permiso.
 *
 * No recibe parámetros: el recurso y la acción se derivan de la propia petición.
 * Añadir un permiso es insertar filas en la base de datos, nunca tocar el código.
 */
const resourceRolesRepository = new resource_roles_repository_1.ResourceRolesRepository();
async function authorize(req, res, next) {
    try {
        if (!req.auth) {
            throw new app_error_1.AppError(401, "Authentication required");
        }
        const method = req.method.toUpperCase();
        const path = (0, resource_match_1.normalizePath)(req.originalUrl);
        const granted = await resourceRolesRepository.findEffectiveForUser(req.auth.id);
        if (!(0, resource_match_1.isOperationGranted)(granted, method, path)) {
            throw new app_error_1.AppError(403, `Forbidden: no grant for ${method} ${path}`);
        }
        next();
    }
    catch (error) {
        (0, error_response_1.sendError)(res, error);
    }
}
//# sourceMappingURL=authorize.middleware.js.map