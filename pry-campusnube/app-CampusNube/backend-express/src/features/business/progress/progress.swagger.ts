export const progressSwagger = {
  tags: [
    {
      name: "Progress",
      description: "Gestión del progreso",
    },
  ],

  paths: {
    "/api/progress": {
      get: {
        tags: ["Progress"],
        summary: "Obtener todos los progresos",
        responses: {
          200: {
            description: "Lista de progresos",
          },
        },
      },

      post: {
        tags: ["Progress"],
        summary: "Crear un progreso",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProgressCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Progreso creado",
          },
        },
      },
    },

    "/api/progress/{id}": {
      get: {
        tags: ["Progress"],
        summary: "Obtener progreso por ID",
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
            description: "Progreso encontrado",
          },
        },
      },

      put: {
        tags: ["Progress"],
        summary: "Actualizar progreso",
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
            description: "Progreso actualizado",
          },
        },
      },

      patch: {
        tags: ["Progress"],
        summary: "Actualizar parcialmente progreso",
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
            description: "Progreso actualizado",
          },
        },
      },

      delete: {
        tags: ["Progress"],
        summary: "Eliminar progreso",
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
            description: "Progreso eliminado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Progress: {
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
          },
          isActive: {
            type: "boolean",
          },
        },
      },

      ProgressCreate: {
        type: "object",
        required: [
          "enrollment_id",
          "name",
        ],
        properties: {
          enrollment_id: {
            type: "integer",
          },
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
