/**
 * Documentación OpenAPI del feature Learner.
 *
 * Se agrega desde `src/swagger` (registry externo),
 * no se monta aquí.
 *
 * Leyenda: endpoints protegidos con JWT + RBAC.
 */

import { bearerSecurity } from "../../../shared/http/swagger-security";

export const learnerSwagger = {
  tags: [
    {
      name: "Aprendices",
      description: "CRUD de aprendices — JWT + RBAC",
    },
  ],

  paths: {
    "/api/aprendices": {
      get: {
        tags: ["Aprendices"],
        summary: "Listar aprendices activos",
        description:
          "JWT + RBAC — retorna aprendices con status=active (sin password)",
        security: bearerSecurity,
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
                        $ref: "#/components/schemas/LearnerResponse",
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
        },
      },

      post: {
        tags: ["Aprendices"],
        summary: "Crear aprendiz",
        description: "JWT + RBAC",
        security: bearerSecurity,
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
                      $ref: "#/components/schemas/LearnerResponse",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Datos inválidos",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
        },
      },
    },

    "/api/aprendices/{id}": {
      get: {
        tags: ["Aprendices"],
        summary: "Obtener aprendiz por id",
        description: "JWT + RBAC",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
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
                      $ref: "#/components/schemas/LearnerResponse",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "id inválido",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Aprendiz no encontrado",
          },
        },
      },

      put: {
        tags: ["Aprendices"],
        summary: "Actualizar aprendiz (PUT — reemplazo)",
        description: "JWT + RBAC",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
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
            description: "Aprendiz actualizado",
          },
          "400": {
            description: "Datos inválidos",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Aprendiz no encontrado",
          },
        },
      },

      patch: {
        tags: ["Aprendices"],
        summary: "Actualizar aprendiz (PATCH — parcial)",
        description: "JWT + RBAC",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
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
            description: "Aprendiz actualizado",
          },
          "400": {
            description: "Datos inválidos",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Aprendiz no encontrado",
          },
        },
      },

      delete: {
        tags: ["Aprendices"],
        summary: "Eliminar aprendiz (físico)",
        description: "JWT + RBAC — elimina la fila",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        responses: {
          "204": {
            description: "Aprendiz eliminado",
          },
          "400": {
            description: "id inválido",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Aprendiz no encontrado",
          },
        },
      },
    },

    "/api/aprendices/{id}/deactivate": {
      patch: {
        tags: ["Aprendices"],
        summary: "Eliminar aprendiz (lógico)",
        description: "JWT + RBAC — status = inactive",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              minimum: 1,
            },
          },
        ],
        responses: {
          "200": {
            description: "Aprendiz desactivado",
          },
          "400": {
            description: "id inválido",
          },
          "401": {
            $ref: "#/components/responses/Unauthorized",
          },
          "403": {
            $ref: "#/components/responses/Forbidden",
          },
          "404": {
            description: "Aprendiz no encontrado",
          },
        },
      },
    },
  },

  components: {
    schemas: {
      LearnerCreate: {
        type: "object",
        required: ["userId"],
        properties: {
          userId: {
            type: "integer",
            example: 1,
          },
        },
      },

      LearnerUpdate: {
        type: "object",
        properties: {
          userId: {
            type: "integer",
            example: 1,
          },
        },
      },

      LearnerResponse: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          userId: {
            type: "integer",
            example: 1,
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
    },
  },
};