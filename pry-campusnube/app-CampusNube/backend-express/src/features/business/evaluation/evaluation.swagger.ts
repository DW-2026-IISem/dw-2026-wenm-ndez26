export const evaluationSwagger = {
  tags: [
    {
      name: "Evaluaciones",
      description: "Operaciones CRUD de evaluaciones",
    },
  ],

  paths: {
    "/api/evaluaciones": {
      get: {
        tags: ["Evaluaciones"],
        summary: "Obtener todas las evaluaciones",
        security: [],
        responses: {
          200: {
            description: "Lista de evaluaciones",
          },
        },
      },

      post: {
        tags: ["Evaluaciones"],
        summary: "Crear una evaluación",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EvaluationCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Evaluación creada correctamente",
          },
          400: {
            description: "Datos obligatorios faltantes o curso inválido",
          },
        },
      },
    },

    "/api/evaluaciones/{id}": {
      get: {
        tags: ["Evaluaciones"],
        summary: "Obtener una evaluación por ID",
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
            description: "Evaluación encontrada",
          },
          404: {
            description: "Evaluación no encontrada",
          },
        },
      },

      put: {
        tags: ["Evaluaciones"],
        summary: "Actualizar una evaluación",
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
                $ref: "#/components/schemas/EvaluationUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Evaluación actualizada correctamente",
          },
          404: {
            description: "Evaluación no encontrada",
          },
        },
      },

      patch: {
        tags: ["Evaluaciones"],
        summary: "Actualizar parcialmente una evaluación",
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
                $ref: "#/components/schemas/EvaluationPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Evaluación actualizada parcialmente",
          },
          404: {
            description: "Evaluación no encontrada",
          },
        },
      },

      delete: {
        tags: ["Evaluaciones"],
        summary: "Eliminar físicamente una evaluación",
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
            description: "Evaluación eliminada correctamente",
          },
          404: {
            description: "Evaluación no encontrada",
          },
        },
      },
    },

    "/api/evaluaciones/{id}/deactivate": {
      patch: {
        tags: ["Evaluaciones"],
        summary: "Desactivar una evaluación",
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
            description: "Evaluación desactivada correctamente",
          },
          404: {
            description: "Evaluación no encontrada",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Evaluation: {
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

      EvaluationCreate: {
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

      EvaluationUpdate: {
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

      EvaluationPatch: {
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
