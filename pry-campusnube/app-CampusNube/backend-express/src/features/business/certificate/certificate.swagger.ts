export const certificateSwagger = {
  tags: [
    {
      name: "Certificate",
      description: "Gestión de certificados",
    },
  ],

  paths: {
    "/api/certificates": {
      get: {
        tags: ["Certificate"],
        summary: "Obtener todos los certificados",
        responses: {
          200: {
            description: "Lista de certificados",
          },
        },
      },

      post: {
        tags: ["Certificate"],
        summary: "Crear certificado",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CertificateCreate",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Certificado creado",
          },
        },
      },
    },

    "/api/certificates/{id}": {
      get: {
        tags: ["Certificate"],
        summary: "Obtener certificado por ID",
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
            description: "Certificado encontrado",
          },
        },
      },

      put: {
        tags: ["Certificate"],
        summary: "Actualizar certificado",
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
            description: "Certificado actualizado",
          },
        },
      },

      patch: {
        tags: ["Certificate"],
        summary: "Actualizar parcialmente certificado",
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
            description: "Certificado actualizado",
          },
        },
      },

      delete: {
        tags: ["Certificate"],
        summary: "Eliminar certificado",
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
            description: "Certificado eliminado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      Certificate: {
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

      CertificateCreate: {
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
