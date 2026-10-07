/**
 * Documentación OpenAPI del feature Attempt.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const attemptSwagger = {
  tags: [
    {
      name: "Intentos",
      description: "CRUD de intentos — JWT + RBAC",
    },
  ],

  paths: {
    "/api/intentos": {
      get: {
        tags: ["Intentos"],
        summary: "Obtener todos los intentos",
        description: "JWT + RBAC",
        security: bearerSecurity,
        responses: {
          200: {
            description: "Lista de intentos",
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
        tags: ["Intentos"],
        summary: "Crear un intento",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AttemptCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Intento creado correctamente",
          },
          400: {
            description:
              "Datos obligatorios faltantes o inscripción inválida",
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

    "/api/intentos/{id}": {
      get: {
        tags: ["Intentos"],
        summary: "Obtener un intento por ID",
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
            description: "Intento encontrado",
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
            description: "Intento no encontrado",
          },
        },
      },

      put: {
        tags: ["Intentos"],
        summary: "Actualizar un intento",
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
                $ref: "#/components/schemas/AttemptUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Intento actualizado correctamente",
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
            description: "Intento no encontrado",
          },
        },
      },

      patch: {
        tags: ["Intentos"],
        summary: "Actualizar parcialmente un intento",
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
                $ref: "#/components/schemas/AttemptPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Intento actualizado parcialmente",
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
            description: "Intento no encontrado",
          },
        },
      },

      delete: {
        tags: ["Intentos"],
        summary: "Eliminar físicamente un intento",
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
            description: "Intento eliminado correctamente",
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
            description: "Intento no encontrado",
          },
        },
      },
    },

    "/api/intentos/{id}/deactivate": {
      patch: {
        tags: ["Intentos"],
        summary: "Desactivar un intento",
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
            description: "Intento desactivado correctamente",
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
            description: "Intento no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Attempt: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          enrollment_id: {
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

      AttemptCreate: {
        type: "object",
        required: ["enrollment_id", "name"],
        properties: {
          enrollment_id: {
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

      AttemptUpdate: {
        type: "object",
        required: ["enrollment_id", "name"],
        properties: {
          enrollment_id: {
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

      AttemptPatch: {
        type: "object",
        properties: {
          enrollment_id: {
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