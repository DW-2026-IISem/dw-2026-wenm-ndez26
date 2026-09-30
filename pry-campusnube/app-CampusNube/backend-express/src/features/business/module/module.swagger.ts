export const moduleSwagger = {
  tags: [
    {
      name: "Módulos",
      description: "Operaciones CRUD de módulos",
    },
  ],

  paths: {
    "/api/modulos": {
      get: {
        tags: ["Módulos"],
        summary: "Obtener todos los módulos",
        security: [],
        responses: {
          200: {
            description: "Lista de módulos",
          },
        },
      },

      post: {
        tags: ["Módulos"],
        summary: "Crear un módulo",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ModuleCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Módulo creado correctamente",
          },
          400: {
            description: "Datos obligatorios faltantes o curso inválido",
          },
        },
      },
    },

    "/api/modulos/{id}": {
      get: {
        tags: ["Módulos"],
        summary: "Obtener un módulo por ID",
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
            description: "Módulo encontrado",
          },
          404: {
            description: "Módulo no encontrado",
          },
        },
      },

      put: {
        tags: ["Módulos"],
        summary: "Actualizar un módulo",
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
                $ref: "#/components/schemas/ModuleUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Módulo actualizado correctamente",
          },
          404: {
            description: "Módulo no encontrado",
          },
        },
      },

      patch: {
        tags: ["Módulos"],
        summary: "Actualizar parcialmente un módulo",
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
                $ref: "#/components/schemas/ModulePatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Módulo actualizado parcialmente",
          },
          404: {
            description: "Módulo no encontrado",
          },
        },
      },

      delete: {
        tags: ["Módulos"],
        summary: "Eliminar físicamente un módulo",
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
            description: "Módulo eliminado correctamente",
          },
          404: {
            description: "Módulo no encontrado",
          },
        },
      },
    },

    "/api/modulos/{id}/deactivate": {
      patch: {
        tags: ["Módulos"],
        summary: "Desactivar un módulo",
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
            description: "Módulo desactivado correctamente",
          },
          404: {
            description: "Módulo no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Module: {
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

      ModuleCreate: {
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

      ModuleUpdate: {
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

      ModulePatch: {
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
