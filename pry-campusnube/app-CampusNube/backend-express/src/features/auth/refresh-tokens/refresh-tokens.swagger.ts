import {
  bearerSecurity,
  invalidIdResponse,
  unauthorizedResponse,
} from "../../../shared/http/swagger-security";

export const refreshTokensSwagger = {
  tags: [
    {
      name: "Sesiones",
      description:
        "Sesiones persistidas del usuario autenticado (refresh tokens)",
    },
  ],

  paths: {
    "/api/sesiones": {
      get: {
        tags: ["Sesiones"],
        summary: "Listar mis sesiones activas",
        description:
          "JWT — devuelve las sesiones del usuario autenticado. token_hash nunca se expone.",
        security: bearerSecurity,
        responses: {
          "200": {
            description: "Sesiones propias",
          },
          "401": unauthorizedResponse,
        },
      },

      delete: {
        tags: ["Sesiones"],
        summary: "Purgar mis sesiones revocadas/expiradas",
        security: bearerSecurity,
        responses: {
          "200": {
            description: "Purga realizada",
          },
          "401": unauthorizedResponse,
        },
      },
    },

    "/api/sesiones/deactivate-all": {
      patch: {
        tags: ["Sesiones"],
        summary: "Revocar todas mis sesiones",
        security: bearerSecurity,
        responses: {
          "200": {
            description: "Sesiones revocadas",
          },
          "401": unauthorizedResponse,
        },
      },
    },

    "/api/sesiones/{id}": {
      get: {
        tags: ["Sesiones"],
        summary: "Consultar una sesión propia",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Sesión encontrada",
          },
          "400": invalidIdResponse,
          "401": unauthorizedResponse,
          "404": {
            description:
              "No encontrada o no pertenece al usuario autenticado",
          },
        },
      },
    },

    "/api/sesiones/{id}/deactivate": {
      patch: {
        tags: ["Sesiones"],
        summary: "Revocar una sesión propia",
        security: bearerSecurity,
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Sesión revocada",
          },
          "400": invalidIdResponse,
          "401": unauthorizedResponse,
          "404": {
            description:
              "No encontrada o no pertenece al usuario autenticado",
          },
        },
      },
    },
  },
};
