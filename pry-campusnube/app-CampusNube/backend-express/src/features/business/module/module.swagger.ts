/**
 * Documentación OpenAPI del feature Module.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const moduleSwagger = {
  tags: [
    {
      name: "Módulos",
      description: "CRUD de módulos — JWT + RBAC",
    },
  ],

  paths: {
    "/api/modulos": {
      get: {
        tags: ["Módulos"],
        summary: "Obtener todos los módulos",
        description: "JWT + RBAC",
        security: bearerSecurity,
        responses: {
          200: {
            description: "Lista de módulos",
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
        tags: ["Módulos"],
        summary: "Crear un módulo",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ModuleCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Módulo creado correctamente",
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

    "/api/modulos/{id}": {
      get: {
        tags: ["Módulos"],
        summary: "Obtener un módulo por ID",
        description: "JWT + RBAC",
        security: bearerSecurity,
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
            description: "Módulo encontrado",
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
            description: "Módulo no encontrado",
          },
        },
      },

      put: {
        tags: ["Módulos"],
        summary: "Actualizar un módulo",
        description: "JWT + RBAC",
        security: bearerSecurity,
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
                $ref: "#/components/schemas/ModuleUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Módulo actualizado correctamente",
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
            description: "Módulo no encontrado",
          },
        },
      },

      patch: {
        tags: ["Módulos"],
        summary: "Actualizar parcialmente un módulo",
        description: "JWT + RBAC",
        security: bearerSecurity,
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
                $ref: "#/components/schemas/ModulePatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Módulo actualizado parcialmente",
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
            description: "Módulo no encontrado",
          },
        },
      },

      delete: {
        tags: ["Módulos"],
        summary: "Eliminar físicamente un módulo",
        description: "JWT + RBAC — elimina la fila",
        security: bearerSecurity,
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
            description: "Módulo eliminado correctamente",
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
            description: "Módulo no encontrado",
          },
        },
      },
    },

    "/api/modulos/{id}/deactivate": {
      patch: {
        tags: ["Módulos"],
        summary: "Desactivar un módulo",
        description: "JWT + RBAC — isActive = false",
        security: bearerSecurity,
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
            description: "Módulo desactivado correctamente",
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
            description: "Módulo no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Module: {
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

      ModuleCreate: {
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

      ModuleUpdate: {
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

      ModulePatch: {
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