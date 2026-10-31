"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleUsersSwagger = void 0;
const swagger_security_1 = require("../../../shared/http/swagger-security");
/**
 * Documentación OpenAPI del feature RoleUsers — **asignaciones usuario ↔ rol**.
 *
 * Modalidad: **JWT + RBAC** en todas las operaciones.
 *
 * Estas rutas son una de las dos vías administrativas de la autorización:
 * `POST /api/asignaciones-rol` **asigna un rol a un usuario**, primer eslabón de
 * la cadena. Sin asignación activa no hay permisos, por muchos roles que existan.
 */
exports.roleUsersSwagger = {
    tags: [
        {
            name: "Asignaciones usuario-rol",
            description: "Asignar / retirar / reactivar el rol de un usuario (`role_users`) — **JWT + RBAC**",
        },
    ],
    paths: {
        "/api/asignaciones-rol": {
            get: {
                tags: ["Asignaciones usuario-rol"],
                summary: "Listar asignaciones activas",
                description: "JWT + RBAC — recurso `GET /api/asignaciones-rol`. Incluye un resumen del usuario (sin `password`) y del rol.",
                security: swagger_security_1.bearerSecurity,
                responses: {
                    "200": { description: "Lista de asignaciones (`{ assignments: [...] }`)" },
                    "401": swagger_security_1.unauthorizedResponse,
                    "403": swagger_security_1.forbiddenResponse,
                },
            },
            post: {
                tags: ["Asignaciones usuario-rol"],
                summary: "Asignar rol a usuario",
                description: "JWT + RBAC — recurso `POST /api/asignaciones-rol`. " +
                    "Cuerpo: `{ user_id, role_id }`. Es idempotente: si la pareja existía desactivada, se reactiva. " +
                    "El usuario y el rol deben estar activos.",
                security: swagger_security_1.bearerSecurity,
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/RoleUserCreate" },
                        },
                    },
                },
                responses: {
                    "201": { description: "Asignación creada (`{ assignment }`)" },
                    "401": swagger_security_1.unauthorizedResponse,
                    "403": swagger_security_1.forbiddenResponse,
                    "404": { description: "Usuario o rol inexistente o inactivo" },
                    "409": { description: "El rol ya está asignado a ese usuario" },
                },
            },
        },
        "/api/asignaciones-rol/{id}": {
            get: {
                tags: ["Asignaciones usuario-rol"],
                summary: "Obtener asignación por id",
                description: "JWT + RBAC — recurso `GET /api/asignaciones-rol/:id`.",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    "200": { description: "Asignación (`{ assignment }`)" },
                    "400": swagger_security_1.invalidIdResponse,
                    "401": swagger_security_1.unauthorizedResponse,
                    "403": swagger_security_1.forbiddenResponse,
                    "404": swagger_security_1.notFoundResponse,
                },
            },
        },
        "/api/asignaciones-rol/{id}/deactivate": {
            patch: {
                tags: ["Asignaciones usuario-rol"],
                summary: "Retirar rol a usuario (borrado lógico)",
                description: "JWT + RBAC — recurso `PATCH /api/asignaciones-rol/:id/deactivate`. " +
                    "Rompe el eslabón `role_users` -> el usuario pierde los permisos de ese rol de inmediato (403).",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Asignación desactivada (`{ message, assignment }`)",
                    },
                    "400": swagger_security_1.invalidIdResponse,
                    "401": swagger_security_1.unauthorizedResponse,
                    "403": swagger_security_1.forbiddenResponse,
                    "404": swagger_security_1.notFoundResponse,
                },
            },
        },
        "/api/asignaciones-rol/{id}/reactivate": {
            patch: {
                tags: ["Asignaciones usuario-rol"],
                summary: "Reactivar asignación",
                description: "JWT + RBAC — recurso `PATCH /api/asignaciones-rol/:id/reactivate`. Reversible: vuelve a conceder los permisos del rol.",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: { type: "integer" },
                    },
                ],
                responses: {
                    "200": {
                        description: "Asignación reactivada (`{ message, assignment }`)",
                    },
                    "400": swagger_security_1.invalidIdResponse,
                    "401": swagger_security_1.unauthorizedResponse,
                    "403": swagger_security_1.forbiddenResponse,
                    "404": swagger_security_1.notFoundResponse,
                    "409": { description: "La asignación ya estaba activa" },
                },
            },
        },
    },
    components: {
        schemas: {
            RoleUser: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    user_id: { type: "integer", example: 1 },
                    role_id: { type: "integer", example: 1 },
                    status: {
                        type: "string",
                        enum: ["active", "inactive"],
                        example: "active",
                    },
                    user: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            username: { type: "string" },
                            email: { type: "string", format: "email" },
                        },
                    },
                    role: {
                        type: "object",
                        properties: {
                            id: { type: "integer" },
                            name: { type: "string" },
                        },
                    },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
            },
            RoleUserCreate: {
                type: "object",
                required: ["user_id", "role_id"],
                properties: {
                    user_id: { type: "integer", example: 2 },
                    role_id: { type: "integer", example: 2 },
                },
            },
        },
    },
};
//# sourceMappingURL=role-users.swagger.js.map