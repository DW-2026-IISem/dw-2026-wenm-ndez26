/**
 * Documentación OpenAPI del feature Learner.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints documentados como SIN AUTH
 * (sin middleware JWT / sin autenticación).
 */

export const learnerSwagger = {
  tags: [
    {
      name: "Aprendices",
      description: "CRUD de aprendices — SIN AUTH",
    },
  ],

  paths: {
    "/api/aprendices": {
      get: {
        tags: ["Aprendices"],
        summary: "Listar aprendices activos",
        description:
          "SIN AUTH — retorna aprendices con status=active (sin password)",
        security: [],
        responses: {
          "200": {
            description: "Lista de aprendices",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    learners: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Learner",
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
        tags: ["Aprendices"],
        summary: "Crear aprendiz",
        description: "SIN AUTH",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LearnerCreate",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Aprendiz creado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    learner: {
                      $ref: "#/components/schemas/Learner",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    "/api/aprendices/{id}": {
      get: {
        tags: ["Aprendices"],
        summary: "Obtener aprendiz por id",
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
            description: "Aprendiz encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    learner: {
                      $ref: "#/components/schemas/Learner",
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
        tags: ["Aprendices"],
        summary: "Actualizar aprendiz (PUT — reemplazo)",
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
                $ref: "#/components/schemas/LearnerUpdate",
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
        tags: ["Aprendices"],
        summary: "Actualizar aprendiz (PATCH — parcial)",
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
                $ref: "#/components/schemas/LearnerPatch",
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
        tags: ["Aprendices"],
        summary: "Eliminar aprendiz (físico)",
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

    "/api/aprendices/{id}/deactivate": {
      patch: {
        tags: ["Aprendices"],
        summary: "Eliminar aprendiz (lógico)",
        description: "SIN AUTH — status = inactive",
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
      Learner: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Ana Pérez",
          },
          description: {
            type: "string",
            example: "Aprendiz de CampusNube",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            example: "active",
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

      LearnerCreate: {
        type: "object",
        required: ["name", "password"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          password: {
            type: "string",
            format: "password",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            default: "active",
          },
        },
      },

      LearnerUpdate: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          password: {
            type: "string",
            format: "password",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },

      LearnerPatch: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          description: {
            type: "string",
          },
          password: {
            type: "string",
            format: "password",
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
