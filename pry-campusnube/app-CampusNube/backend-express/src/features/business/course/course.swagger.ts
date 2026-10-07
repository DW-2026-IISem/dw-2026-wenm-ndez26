/**
 * Documentación OpenAPI del feature Course.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const courseSwagger = {
  tags: [
    {
      name: "Cursos",
      description: "CRUD de cursos — JWT + RBAC",
    },
  ],

  paths: {
    "/api/cursos": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener todos los cursos activos",
        description: "JWT + RBAC — retorna cursos activos",
        security: bearerSecurity,
        responses: {
          200: {
            description: "Lista de cursos obtenida correctamente",
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
        tags: ["Cursos"],
        summary: "Crear un curso",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CourseCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Curso creado correctamente",
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

    "/api/cursos/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener un curso por ID",
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
            description: "Curso encontrado",
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
            description: "Curso no encontrado",
          },
        },
      },

      put: {
        tags: ["Cursos"],
        summary: "Actualizar completamente un curso",
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
                $ref: "#/components/schemas/CourseUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Curso actualizado correctamente",
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
            description: "Curso no encontrado",
          },
        },
      },

      patch: {
        tags: ["Cursos"],
        summary: "Actualizar parcialmente un curso",
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
                $ref: "#/components/schemas/CoursePatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Curso actualizado correctamente",
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
            description: "Curso no encontrado",
          },
        },
      },

      delete: {
        tags: ["Cursos"],
        summary: "Eliminar físicamente un curso",
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
            description: "Curso eliminado correctamente",
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
            description: "Curso no encontrado",
          },
        },
      },
    },

    "/api/cursos/{id}/deactivate": {
      patch: {
        tags: ["Cursos"],
        summary: "Desactivar lógicamente un curso",
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
            description: "Curso desactivado correctamente",
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
            description: "Curso no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Course: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Seguridad Industrial",
          },
          description: {
            type: "string",
            example: "Curso de fundamentos de seguridad industrial",
          },
          isActive: {
            type: "boolean",
            example: true,
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

      CourseCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            example: "Seguridad Industrial",
          },
          description: {
            type: "string",
            example: "Curso de fundamentos de seguridad industrial",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },

      CourseUpdate: {
        type: "object",
        required: ["name", "description", "isActive"],
        properties: {
          name: {
            type: "string",
            example: "Seguridad Industrial Avanzada",
          },
          description: {
            type: "string",
            example: "Curso actualizado de seguridad industrial",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },

      CoursePatch: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Seguridad Industrial Avanzada",
          },
          description: {
            type: "string",
            example: "Descripción actualizada",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },
    },
  },
};