/**
 * Documentación OpenAPI del feature Submission.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const submissionSwagger = {
  tags: [
    {
      name: "Entregas",
      description: "CRUD de entregas — JWT + RBAC",
    },
  ],

  paths: {
    "/api/entregas": {
      get: {
        tags: ["Entregas"],
        summary: "Obtener todas las entregas",
        description: "JWT + RBAC",
        security: bearerSecurity,
        responses: {
          200: {
            description: "Lista de entregas",
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
        tags: ["Entregas"],
        summary: "Crear una entrega",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SubmissionCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Entrega creada correctamente",
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
        },
      },
    },

    "/api/entregas/{id}": {
      get: {
        tags: ["Entregas"],
        summary: "Obtener una entrega por ID",
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
            description: "Entrega encontrada",
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
            description: "Entrega no encontrada",
          },
        },
      },

      put: {
        tags: ["Entregas"],
        summary: "Actualizar una entrega",
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
                $ref: "#/components/schemas/SubmissionUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrega actualizada correctamente",
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
            description: "Entrega no encontrada",
          },
        },
      },

      patch: {
        tags: ["Entregas"],
        summary: "Actualizar parcialmente una entrega",
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
                $ref: "#/components/schemas/SubmissionPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrega actualizada parcialmente",
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
            description: "Entrega no encontrada",
          },
        },
      },

      delete: {
        tags: ["Entregas"],
        summary: "Eliminar físicamente una entrega",
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
            description: "Entrega eliminada correctamente",
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
            description: "Entrega no encontrada",
          },
        },
      },
    },

    "/api/entregas/{id}/deactivate": {
      patch: {
        tags: ["Entregas"],
        summary: "Desactivar una entrega",
        description: "JWT + RBAC — desactiva la entrega",
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
            description: "Entrega desactivada correctamente",
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
            description: "Entrega no encontrada",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Submission: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          referencia_id: {
            type: "integer",
          },
          lesson_id: {
            type: "integer",
          },
          enrollment_id: {
            type: "integer",
          },
          fecha_inicio: {
            type: "string",
            format: "date-time",
          },
          fecha_fin: {
            type: "string",
            format: "date-time",
            nullable: true,
          },
          total: {
            type: "number",
            format: "float",
            nullable: true,
          },
          estado: {
            type: "string",
          },
          observaciones: {
            type: "string",
            nullable: true,
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

      SubmissionCreate: {
        type: "object",
        required: [
          "referencia_id",
          "lesson_id",
          "enrollment_id",
          "fecha_inicio",
          "estado",
        ],
        properties: {
          referencia_id: {
            type: "integer",
          },
          lesson_id: {
            type: "integer",
          },
          enrollment_id: {
            type: "integer",
          },
          fecha_inicio: {
            type: "string",
            format: "date-time",
          },
          fecha_fin: {
            type: "string",
            format: "date-time",
          },
          total: {
            type: "number",
            format: "float",
          },
          estado: {
            type: "string",
          },
          observaciones: {
            type: "string",
          },
        },
      },

      SubmissionUpdate: {
        type: "object",
        required: [
          "referencia_id",
          "lesson_id",
          "enrollment_id",
          "fecha_inicio",
          "estado",
        ],
        properties: {
          referencia_id: {
            type: "integer",
          },
          lesson_id: {
            type: "integer",
          },
          enrollment_id: {
            type: "integer",
          },
          fecha_inicio: {
            type: "string",
            format: "date-time",
          },
          fecha_fin: {
            type: "string",
            format: "date-time",
          },
          total: {
            type: "number",
            format: "float",
          },
          estado: {
            type: "string",
          },
          observaciones: {
            type: "string",
          },
        },
      },

      SubmissionPatch: {
        type: "object",
        properties: {
          referencia_id: {
            type: "integer",
          },
          lesson_id: {
            type: "integer",
          },
          enrollment_id: {
            type: "integer",
          },
          fecha_inicio: {
            type: "string",
            format: "date-time",
          },
          fecha_fin: {
            type: "string",
            format: "date-time",
          },
          total: {
            type: "number",
            format: "float",
          },
          estado: {
            type: "string",
          },
          observaciones: {
            type: "string",
          },
        },
      },
    },
  },
};