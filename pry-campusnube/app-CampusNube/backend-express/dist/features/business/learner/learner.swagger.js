"use strict";
/**
 * Documentación OpenAPI del feature Learner.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Endpoints protegidos con JWT + RBAC.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.learnerSwagger = void 0;
const swagger_security_1 = require("../../../shared/http/swagger-security");
exports.learnerSwagger = {
    tags: [
        {
            name: "Learners",
            description: "CRUD de Learners — JWT + RBAC",
        },
    ],
    paths: {
        "/api/Learners": {
            get: {
                tags: ["Learners"],
                summary: "Listar Learners activos",
                description: "JWT + RBAC — retorna Learners con status=active (sin password)",
                security: swagger_security_1.bearerSecurity,
                responses: {
                    "200": {
                        description: "Lista de Learners",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        learners: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/LearnerResponse",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                },
            },
            post: {
                tags: ["Learners"],
                summary: "Crear aprendiz",
                description: "JWT + RBAC",
                security: swagger_security_1.bearerSecurity,
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/LearnerCreate",
                            },
                        },
                    },
                },
                responses: {
                    "201": {
                        description: "Aprendiz creado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        learner: {
                                            $ref: "#/components/schemas/LearnerResponse",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "Datos inválidos",
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                },
            },
        },
        "/api/Learners/{id}": {
            get: {
                tags: ["Learners"],
                summary: "Obtener aprendiz por ID",
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
                    "200": {
                        description: "Aprendiz encontrado",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        learner: {
                                            $ref: "#/components/schemas/LearnerResponse",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    "400": {
                        description: "ID inválido",
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                    "404": {
                        description: "Aprendiz no encontrado",
                    },
                },
            },
            put: {
                tags: ["Learners"],
                summary: "Actualizar aprendiz (PUT — reemplazo)",
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
                                $ref: "#/components/schemas/LearnerUpdate",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Aprendiz actualizado",
                    },
                    "400": {
                        description: "Datos inválidos",
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                    "404": {
                        description: "Aprendiz no encontrado",
                    },
                },
            },
            patch: {
                tags: ["Learners"],
                summary: "Actualizar aprendiz (PATCH — parcial)",
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
                                $ref: "#/components/schemas/LearnerUpdate",
                            },
                        },
                    },
                },
                responses: {
                    "200": {
                        description: "Aprendiz actualizado",
                    },
                    "400": {
                        description: "Datos inválidos",
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                    "404": {
                        description: "Aprendiz no encontrado",
                    },
                },
            },
            delete: {
                tags: ["Learners"],
                summary: "Eliminar aprendiz (físico)",
                description: "JWT + RBAC — elimina permanentemente el registro",
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
                    "200": {
                        description: "Aprendiz eliminado",
                    },
                    "400": {
                        description: "ID inválido",
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                    "404": {
                        description: "Aprendiz no encontrado",
                    },
                },
            },
        },
        "/api/Learners/{id}/deactivate": {
            patch: {
                tags: ["Learners"],
                summary: "Desactivar aprendiz (eliminación lógica)",
                description: "JWT + RBAC — cambia status a inactive",
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
                    "200": {
                        description: "Aprendiz desactivado",
                    },
                    "400": {
                        description: "ID inválido",
                    },
                    "401": {
                        $ref: "#/components/responses/Unauthorized",
                    },
                    "403": {
                        $ref: "#/components/responses/Forbidden",
                    },
                    "404": {
                        description: "Aprendiz no encontrado",
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            LearnerCreate: {
                type: "object",
                required: ["name", "password"],
                properties: {
                    name: {
                        type: "string",
                        example: "Aprendiz de prueba",
                    },
                    description: {
                        type: "string",
                        example: "Registro de prueba",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "Aprendiz123!",
                    },
                    status: {
                        type: "string",
                        enum: ["active", "inactive"],
                        example: "active",
                    },
                },
            },
            LearnerUpdate: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "Aprendiz actualizado",
                    },
                    description: {
                        type: "string",
                        example: "Descripción actualizada",
                    },
                    password: {
                        type: "string",
                        format: "password",
                        example: "Aprendiz123!",
                    },
                    status: {
                        type: "string",
                        enum: ["active", "inactive"],
                        example: "active",
                    },
                },
            },
            LearnerResponse: {
                type: "object",
                properties: {
                    id: {
                        type: "integer",
                        example: 11,
                    },
                    name: {
                        type: "string",
                        example: "Aprendiz de prueba",
                    },
                    description: {
                        type: "string",
                        example: "Registro de prueba",
                    },
                    status: {
                        type: "string",
                        enum: ["active", "inactive"],
                        example: "active",
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
        },
    },
};
//# sourceMappingURL=learner.swagger.js.map