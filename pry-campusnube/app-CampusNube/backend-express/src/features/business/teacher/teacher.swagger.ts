/**
 * Documentación OpenAPI del feature Teacher.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const teacherSwagger = {
  tags: [
    {
      name: "Docentes",
      description: "CRUD de docentes — JWT + RBAC",
    },
  ],

  paths: {
    "/api/docentes": {
      get: {
        tags: ["Docentes"],
        summary: "Listar docentes activos",
        description:
          "JWT + RBAC — retorna docentes con status=active",
        security: bearerSecurity,
        responses: {
          "200": {
            description: "Lista de docentes",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    teachers: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/TeacherResponse",
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
        tags: ["Docentes"],
        summary: "Crear docente",
        description: "JWT + RBAC",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TeacherCreate",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Docente creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    teacher: {
                      $ref: "#/components/schemas/TeacherResponse",
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

    "/api/docentes/{id}": {
      get: {
        tags: ["Docentes"],
        summary: "Obtener docente por id",
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
          "200": {
            description: "Docente encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    teacher: {
                      $ref: "#/components/schemas/TeacherResponse",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "id inválido",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Docente no encontrado",
          },
        },
      },

      put: {
        tags: ["Docentes"],
        summary: "Actualizar docente (PUT — reemplazo)",
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
                $ref: "#/components/schemas/TeacherUpdate",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Docente actualizado",
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
            description: "Docente no encontrado",
          },
        },
      },

      patch: {
        tags: ["Docentes"],
        summary: "Actualizar docente (PATCH — parcial)",
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
                $ref: "#/components/schemas/TeacherPatch",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Docente actualizado",
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
            description: "Docente no encontrado",
          },
        },
      },

      delete: {
        tags: ["Docentes"],
        summary: "Eliminar docente (físico)",
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
          "204": {
            description: "Docente eliminado",
          },
          "400": {
            description: "id inválido",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Docente no encontrado",
          },
        },
      },
    },

    "/api/docentes/{id}/deactivate": {
      patch: {
        tags: ["Docentes"],
        summary: "Eliminar docente (lógico)",
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
          "200": {
            description: "Docente desactivado",
          },
          "400": {
            description: "id inválido",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Docente no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      TeacherCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            example: "Juan Pérez",
          },
          description: {
            type: "string",
            nullable: true,
            example: "Docente del área de Seguridad y Salud en el Trabajo",
          },
          isActive: {
            type: "boolean",
            example: true,
            default: true,
          },
        },
      },

      TeacherUpdate: {
        type: "object",
        required: ["name", "description", "isActive"],
        properties: {
          name: {
            type: "string",
            example: "Juan Pérez",
          },
          description: {
            type: "string",
            nullable: true,
            example: "Docente del área de Seguridad y Salud en el Trabajo",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },

      TeacherPatch: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Juan Pérez",
          },
          description: {
            type: "string",
            nullable: true,
            example: "Docente del área de Seguridad y Salud en el Trabajo",
          },
          isActive: {
            type: "boolean",
            example: true,
          },
        },
      },

      TeacherResponse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Juan Pérez",
          },
          description: {
            type: "string",
            nullable: true,
            example: "Docente del área de Seguridad y Salud en el Trabajo",
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
    },
  },
};