/**
 * Documentación OpenAPI del feature Lesson.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const lessonSwagger = {
  tags: [
    {
      name: "Lecciones",
      description: "CRUD de lecciones — JWT + RBAC",
    },
  ],

  paths: {
    "/api/lecciones": {
      get: {
        tags: ["Lecciones"],
        summary: "Obtener todas las lecciones",
        description: "JWT + RBAC",
        security: bearerSecurity,
        responses: {
          200: {
            description: "Lista de lecciones",
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
        tags: ["Lecciones"],
        summary: "Crear una lección",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LessonCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Lección creada correctamente",
          },
          400: {
            description: "Datos obligatorios faltantes o módulo inválido",
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

    "/api/lecciones/{id}": {
      get: {
        tags: ["Lecciones"],
        summary: "Obtener una lección por ID",
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
            description: "Lección encontrada",
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
            description: "Lección no encontrada",
          },
        },
      },

      put: {
        tags: ["Lecciones"],
        summary: "Actualizar una lección",
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
                $ref: "#/components/schemas/LessonUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Lección actualizada correctamente",
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
            description: "Lección no encontrada",
          },
        },
      },

      patch: {
        tags: ["Lecciones"],
        summary: "Actualizar parcialmente una lección",
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
                $ref: "#/components/schemas/LessonPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Lección actualizada parcialmente",
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
            description: "Lección no encontrada",
          },
        },
      },

      delete: {
        tags: ["Lecciones"],
        summary: "Eliminar físicamente una lección",
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
            description: "Lección eliminada correctamente",
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
            description: "Lección no encontrada",
          },
        },
      },
    },

    "/api/lecciones/{id}/deactivate": {
      patch: {
        tags: ["Lecciones"],
        summary: "Desactivar una lección",
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
            description: "Lección desactivada correctamente",
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
            description: "Lección no encontrada",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Lesson: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          module_id: {
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

      LessonCreate: {
        type: "object",
        required: ["module_id", "name"],
        properties: {
          module_id: {
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

      LessonUpdate: {
        type: "object",
        required: ["module_id", "name"],
        properties: {
          module_id: {
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

      LessonPatch: {
        type: "object",
        properties: {
          module_id: {
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