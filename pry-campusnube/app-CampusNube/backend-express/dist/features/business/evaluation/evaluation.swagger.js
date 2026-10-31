"use strict";
/**
 * Documentación OpenAPI del feature Evaluation.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluationSwagger = void 0;
const swagger_security_1 = require("../../../shared/http/swagger-security");
exports.evaluationSwagger = {
    tags: [
        {
            name: "Evaluaciones",
            description: "CRUD de evaluaciones — JWT + RBAC",
        },
    ],
    paths: {
        "/api/evaluaciones": {
            get: {
                tags: ["Evaluaciones"],
                summary: "Obtener todas las evaluaciones",
                description: "JWT + RBAC",
                security: swagger_security_1.bearerSecurity,
                responses: {
                    200: {
                        description: "Lista de evaluaciones",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                },
            },
            post: {
                tags: ["Evaluaciones"],
                summary: "Crear una evaluación",
                description: "JWT + RBAC",
                security: swagger_security_1.bearerSecurity,
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/EvaluationCreate",
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: "Evaluación creada correctamente",
                    },
                    400: {
                        description: "Datos obligatorios faltantes o curso inválido",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                },
            },
        },
        "/api/evaluaciones/{id}": {
            get: {
                tags: ["Evaluaciones"],
                summary: "Obtener una evaluación por ID",
                description: "JWT + RBAC",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Evaluación encontrada",
                    },
                    400: {
                        description: "id inválido",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                    404: {
                        description: "Evaluación no encontrada",
                    },
                },
            },
            put: {
                tags: ["Evaluaciones"],
                summary: "Actualizar una evaluación",
                description: "JWT + RBAC",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/EvaluationUpdate",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Evaluación actualizada correctamente",
                    },
                    400: {
                        description: "Datos inválidos",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                    404: {
                        description: "Evaluación no encontrada",
                    },
                },
            },
            patch: {
                tags: ["Evaluaciones"],
                summary: "Actualizar parcialmente una evaluación",
                description: "JWT + RBAC",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/EvaluationPatch",
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: "Evaluación actualizada parcialmente",
                    },
                    400: {
                        description: "Datos inválidos",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                    404: {
                        description: "Evaluación no encontrada",
                    },
                },
            },
            delete: {
                tags: ["Evaluaciones"],
                summary: "Eliminar físicamente una evaluación",
                description: "JWT + RBAC — elimina la fila",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Evaluación eliminada correctamente",
                    },
                    400: {
                        description: "id inválido",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                    404: {
                        description: "Evaluación no encontrada",
                    },
                },
            },
        },
        "/api/evaluaciones/{id}/deactivate": {
            patch: {
                tags: ["Evaluaciones"],
                summary: "Desactivar una evaluación",
                description: "JWT + RBAC — isActive = false",
                security: swagger_security_1.bearerSecurity,
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "integer",
                            minimum: 1,
                        },
                    },
                ],
                responses: {
                    200: {
                        description: "Evaluación desactivada correctamente",
                    },
                    400: {
                        description: "id inválido",
                    },
                    401: {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    403: {
                        $ref: "#/components/responses/Forbidden",
                    },
                    404: {
                        description: "Evaluación no encontrada",
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            Evaluation: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                    },
                    course_id: {
                        type: "integer",
                    },
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                        nullable: true,
                    },
                    isActive: {
                        type: "boolean",
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time",
                    },
                },
            },
            EvaluationCreate: {
                type: "object",
                required: ["course_id", "name"],
                properties: {
                    course_id: {
                        type: "integer",
                    },
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                        nullable: true,
                    },
                    isActive: {
                        type: "boolean",
                        default: true,
                    },
                },
            },
            EvaluationUpdate: {
                type: "object",
                required: ["course_id", "name"],
                properties: {
                    course_id: {
                        type: "integer",
                    },
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                        nullable: true,
                    },
                    isActive: {
                        type: "boolean",
                    },
                },
            },
            EvaluationPatch: {
                type: "object",
                properties: {
                    course_id: {
                        type: "integer",
                    },
                    name: {
                        type: "string",
                    },
                    description: {
                        type: "string",
                        nullable: true,
                    },
                    isActive: {
                        type: "boolean",
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=evaluation.swagger.js.map