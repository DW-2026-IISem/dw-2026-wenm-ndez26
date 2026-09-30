export const submissionSwagger = {
  tags: [
    {
      name: "Entregas",
      description: "Operaciones CRUD de entregas",
    },
  ],

  paths: {
    "/api/entregas": {
      get: {
        tags: ["Entregas"],
        summary: "Obtener todas las entregas",
        security: [],
        responses: {
          200: {
            description: "Lista de entregas",
          },
        },
      },

      post: {
        tags: ["Entregas"],
        summary: "Crear una entrega",
        security: [],
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
        },
      },
    },

    "/api/entregas/{id}": {
      get: {
        tags: ["Entregas"],
        summary: "Obtener una entrega por ID",
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
            description: "Entrega encontrada",
          },
          404: {
            description: "Entrega no encontrada",
          },
        },
      },

      put: {
        tags: ["Entregas"],
        summary: "Actualizar una entrega",
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
                $ref: "#/components/schemas/SubmissionUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrega actualizada correctamente",
          },
        },
      },

      patch: {
        tags: ["Entregas"],
        summary: "Actualizar parcialmente una entrega",
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
                $ref: "#/components/schemas/SubmissionPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entrega actualizada parcialmente",
          },
        },
      },

      delete: {
        tags: ["Entregas"],
        summary: "Eliminar físicamente una entrega",
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
            description: "Entrega eliminada correctamente",
          },
        },
      },
    },

    "/api/entregas/{id}/deactivate": {
      patch: {
        tags: ["Entregas"],
        summary: "Desactivar una entrega",
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
            description: "Entrega desactivada correctamente",
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
          "estado"
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
          "estado"
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
