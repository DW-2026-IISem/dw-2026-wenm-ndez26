export const enrollmentSwagger = {
  tags: [
    {
      name: "Inscripciones",
      description: "Operaciones CRUD de inscripciones",
    },
  ],

  paths: {
    "/api/inscripciones": {
      get: {
        tags: ["Inscripciones"],
        summary: "Obtener todas las inscripciones",
        security: [],
        responses: {
          200: {
            description: "Lista de inscripciones",
          },
        },
      },

      post: {
        tags: ["Inscripciones"],
        summary: "Crear una inscripción",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/EnrollmentCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Inscripción creada correctamente",
          },
          400: {
            description: "Datos obligatorios faltantes",
          },
        },
      },
    },

    "/api/inscripciones/{id}": {
      get: {
        tags: ["Inscripciones"],
        summary: "Obtener una inscripción por ID",
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
            description: "Inscripción encontrada",
          },
          404: {
            description: "Inscripción no encontrada",
          },
        },
      },

      put: {
        tags: ["Inscripciones"],
        summary: "Actualizar una inscripción",
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
                $ref: "#/components/schemas/EnrollmentUpdate",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Inscripción actualizada correctamente",
          },
          404: {
            description: "Inscripción no encontrada",
          },
        },
      },

      patch: {
        tags: ["Inscripciones"],
        summary: "Actualizar parcialmente una inscripción",
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
                $ref: "#/components/schemas/EnrollmentPatch",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Inscripción actualizada parcialmente",
          },
          404: {
            description: "Inscripción no encontrada",
          },
        },
      },

      delete: {
        tags: ["Inscripciones"],
        summary: "Eliminar físicamente una inscripción",
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
            description: "Inscripción eliminada correctamente",
          },
          404: {
            description: "Inscripción no encontrada",
          },
        },
      },
    },

    "/api/inscripciones/{id}/deactivate": {
      patch: {
        tags: ["Inscripciones"],
        summary: "Desactivar una inscripción",
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
            description: "Inscripción desactivada correctamente",
          },
          404: {
            description: "Inscripción no encontrada",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Enrollment: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
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

      EnrollmentCreate: {
        type: "object",
        required: ["learner_id", "course_id"],
        properties: {
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
            default: "active",
          },
        },
      },

      EnrollmentUpdate: {
        type: "object",
        required: ["learner_id", "course_id", "status"],
        properties: {
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
          },
          status: {
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },

      EnrollmentPatch: {
        type: "object",
        properties: {
          learner_id: {
            type: "integer",
          },
          course_id: {
            type: "integer",
          },
          enrollment_date: {
            type: "string",
            format: "date-time",
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