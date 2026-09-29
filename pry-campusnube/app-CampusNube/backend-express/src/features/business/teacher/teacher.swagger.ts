/**
 * Documentación OpenAPI del feature Teacher.
 * Se agrega desde `src/swagger` (registry externo), no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH (sin middleware JWT).
 */

export const teacherSwagger = {
  tags: [
    {
      name: "Docentes",
      description: "CRUD de docentes — **SIN AUTH** (sin middleware JWT)",
    },
  ],

  paths: {
    "/api/docentes": {
      get: {
        tags: ["Docentes"],
        summary: "Listar docentes activos",
        description: "SIN AUTH — retorna docentes con isActive=true",
        security: [],
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
                        $ref: "#/components/schemas/Teacher",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      post: {
        tags: ["Docentes"],
        summary: "Crear docente",
        description: "SIN AUTH",
        security: [],
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
                      $ref: "#/components/schemas/Teacher",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/docentes/{id}": {
      get: {
        tags: ["Docentes"],
        summary: "Obtener docente por id",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
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
                      $ref: "#/components/schemas/Teacher",
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "No encontrado",
          },
        },
      },

      put: {
        tags: ["Docentes"],
        summary: "Actualizar docente (PUT — reemplazo)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
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
            description: "Actualizado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },

      patch: {
        tags: ["Docentes"],
        summary: "Actualizar docente (PATCH — parcial)",
        description: "SIN AUTH",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
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
            description: "Actualizado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },

      delete: {
        tags: ["Docentes"],
        summary: "Eliminar docente (físico)",
        description: "SIN AUTH — borra la fila",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Eliminado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },
    },

    "/api/docentes/{id}/deactivate": {
      patch: {
        tags: ["Docentes"],
        summary: "Desactivar docente (eliminación lógica)",
        description: "SIN AUTH — isActive = false",
        security: [],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          "200": {
            description: "Desactivado",
          },
          "404": {
            description: "No encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Teacher: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Carlos Rodríguez",
          },
          description: {
            type: "string",
            example: "Docente del programa de Seguridad y Salud en el Trabajo",
            nullable: true,
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

      TeacherCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          isActive: {
            type: "boolean",
            default: true,
          },
        },
      },

      TeacherUpdate: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          isActive: {
            type: "boolean",
          },
        },
      },

      TeacherPatch: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          isActive: {
            type: "boolean",
          },
        },
      },
    },
  },
};
