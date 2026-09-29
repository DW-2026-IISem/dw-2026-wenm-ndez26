export const courseSwagger = {
  tags: [
    {
      name: "Cursos",
      description: "Operaciones CRUD de cursos de CampusNube",
    },
  ],

  paths: {
    "/api/cursos": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener todos los cursos activos",
        security: [],
        responses: {
          200: {
            description: "Lista de cursos obtenida correctamente",
          },
        },
      },

      post: {
        tags: ["Cursos"],
        summary: "Crear un curso",
        security: [],
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
        },
      },
    },

    "/api/cursos/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener un curso por ID",
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
            description: "Curso encontrado",
          },
          404: {
            description: "Curso no encontrado",
          },
        },
      },

      put: {
        tags: ["Cursos"],
        summary: "Actualizar completamente un curso",
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
                $ref: "#/components/schemas/CourseUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Curso actualizado correctamente",
          },
          404: {
            description: "Curso no encontrado",
          },
        },
      },

      patch: {
        tags: ["Cursos"],
        summary: "Actualizar parcialmente un curso",
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
                $ref: "#/components/schemas/CoursePatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Curso actualizado correctamente",
          },
          404: {
            description: "Curso no encontrado",
          },
        },
      },

      delete: {
        tags: ["Cursos"],
        summary: "Eliminar físicamente un curso",
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
            description: "Curso eliminado correctamente",
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
            description: "Curso desactivado correctamente",
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