export const lessonSwagger = {
  tags: [
    {
      name: "Lecciones",
      description: "Operaciones CRUD de lecciones",
    },
  ],

  paths: {
    "/api/lecciones": {
      get: {
        tags: ["Lecciones"],
        summary: "Obtener todas las lecciones",
        security: [],
        responses: {
          200: {
            description: "Lista de lecciones",
          },
        },
      },

      post: {
        tags: ["Lecciones"],
        summary: "Crear una lección",
        security: [],
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
        },
      },
    },

    "/api/lecciones/{id}": {
      get: {
        tags: ["Lecciones"],
        summary: "Obtener una lección por ID",
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
          200: {
            description: "Lección encontrada",
          },
          404: {
            description: "Lección no encontrada",
          },
        },
      },

      put: {
        tags: ["Lecciones"],
        summary: "Actualizar una lección",
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
                $ref: "#/components/schemas/LessonUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Lección actualizada correctamente",
          },
          404: {
            description: "Lección no encontrada",
          },
        },
      },

      patch: {
        tags: ["Lecciones"],
        summary: "Actualizar parcialmente una lección",
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
                $ref: "#/components/schemas/LessonPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Lección actualizada parcialmente",
          },
          404: {
            description: "Lección no encontrada",
          },
        },
      },

      delete: {
        tags: ["Lecciones"],
        summary: "Eliminar físicamente una lección",
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
          200: {
            description: "Lección eliminada correctamente",
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
          200: {
            description: "Lección desactivada correctamente",
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
