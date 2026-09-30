export const attemptSwagger = {
  tags: [
    {
      name: "Intentos",
      description: "Operaciones CRUD de intentos",
    },
  ],

  paths: {
    "/api/intentos": {
      get: {
        tags: ["Intentos"],
        summary: "Obtener todos los intentos",
        security: [],
        responses: {
          200: {
            description: "Lista de intentos",
          },
        },
      },

      post: {
        tags: ["Intentos"],
        summary: "Crear un intento",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AttemptCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Intento creado correctamente",
          },
          400: {
            description:
              "Datos obligatorios faltantes o inscripción inválida",
          },
        },
      },
    },

    "/api/intentos/{id}": {
      get: {
        tags: ["Intentos"],
        summary: "Obtener un intento por ID",
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
            description: "Intento encontrado",
          },
          404: {
            description: "Intento no encontrado",
          },
        },
      },

      put: {
        tags: ["Intentos"],
        summary: "Actualizar un intento",
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
                $ref: "#/components/schemas/AttemptUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Intento actualizado correctamente",
          },
          404: {
            description: "Intento no encontrado",
          },
        },
      },

      patch: {
        tags: ["Intentos"],
        summary: "Actualizar parcialmente un intento",
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
                $ref: "#/components/schemas/AttemptPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Intento actualizado parcialmente",
          },
          404: {
            description: "Intento no encontrado",
          },
        },
      },

      delete: {
        tags: ["Intentos"],
        summary: "Eliminar físicamente un intento",
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
            description: "Intento eliminado correctamente",
          },
          404: {
            description: "Intento no encontrado",
          },
        },
      },
    },

    "/api/intentos/{id}/deactivate": {
      patch: {
        tags: ["Intentos"],
        summary: "Desactivar un intento",
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
            description: "Intento desactivado correctamente",
          },
          404: {
            description: "Intento no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Attempt: {
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

      AttemptCreate: {
        type: "object",
        required: ["enrollment_id", "name"],
        properties: {
          enrollment_id: {
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

      AttemptUpdate: {
        type: "object",
        required: ["enrollment_id", "name"],
        properties: {
          enrollment_id: {
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

      AttemptPatch: {
        type: "object",
        properties: {
          enrollment_id: {
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
