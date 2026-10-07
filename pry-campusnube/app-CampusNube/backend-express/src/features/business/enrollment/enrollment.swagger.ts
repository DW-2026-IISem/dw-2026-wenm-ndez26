/**
 * Documentación OpenAPI del feature Enrollment.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const enrollmentSwagger = {
  tags: [
    {
      name: "Inscripciones",
      description: "CRUD de inscripciones — JWT + RBAC",
    },
  ],

  paths: {
    "/api/inscripciones": {
      get: {
        tags: ["Inscripciones"],
        summary: "Obtener todas las inscripciones",
        description: "JWT + RBAC",
        security: bearerSecurity,
        responses: {
          200: {
            description: "Lista de inscripciones",
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
        tags: ["Inscripciones"],
        summary: "Crear una inscripción",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EnrollmentCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Inscripción creada correctamente",
          },
          400: {
            description: "Datos obligatorios faltantes",
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

    "/api/inscripciones/{id}": {
      get: {
        tags: ["Inscripciones"],
        summary: "Obtener una inscripción por ID",
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
            description: "Inscripción encontrada",
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
            description: "Inscripción no encontrada",
          },
        },
      },

      put: {
        tags: ["Inscripciones"],
        summary: "Actualizar una inscripción",
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
                $ref: "#/components/schemas/EnrollmentUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Inscripción actualizada correctamente",
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
            description: "Inscripción no encontrada",
          },
        },
      },

      patch: {
        tags: ["Inscripciones"],
        summary: "Actualizar parcialmente una inscripción",
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
                $ref: "#/components/schemas/EnrollmentPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Inscripción actualizada parcialmente",
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
            description: "Inscripción no encontrada",
          },
        },
      },

      delete: {
        tags: ["Inscripciones"],
        summary: "Eliminar físicamente una inscripción",
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
            description: "Inscripción eliminada correctamente",
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
            description: "Inscripción no encontrada",
          },
        },
      },
    },

    "/api/inscripciones/{id}/deactivate": {
      patch: {
        tags: ["Inscripciones"],
        summary: "Desactivar una inscripción",
        description: "JWT + RBAC — status = inactive",
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
            description: "Inscripción desactivada correctamente",
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
            description: "Inscripción no encontrada",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Enrollment: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
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

      EnrollmentCreate: {
        type: "object",
        required: ["learner_id", "course_id"],
        properties: {
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            default: "active",
          },
        },
      },

      EnrollmentUpdate: {
        type: "object",
        required: ["learner_id", "course_id", "status"],
        properties: {
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },

      EnrollmentPatch: {
        type: "object",
        properties: {
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },
    },
  },
};