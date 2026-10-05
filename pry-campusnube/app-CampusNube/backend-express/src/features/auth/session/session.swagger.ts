import {
  bearerSecurity,
  openSecurity,
  unauthorizedResponse,
} from "../../../shared/http/swagger-security";

export const sessionSwagger = {
  tags: [
    {
      name: "Sesión",
      description:
        "Login, renovación, cierre y perfil — OPEN + JWT",
    },
  ],

  paths: {
    "/api/sesion/login": {
      post: {
        tags: ["Sesión"],
        summary: "Iniciar sesión",
        security: openSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Login",
              },
            },
          },
        },
        responses: {
          "200": {
            description:
              "Par de tokens",
          },
          "400": {
            description:
              "Faltan credenciales",
          },
          "401": {
            description:
              "Credenciales inválidas",
          },
        },
      },
    },

    "/api/sesion/refresh": {
      post: {
        tags: ["Sesión"],
        summary: "Renovar access token",
        security: openSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshToken",
              },
            },
          },
        },
        responses: {
          "200": {
            description:
              "Nuevos tokens",
          },
          "400": {
            description:
              "Falta refresh_token",
          },
          "401": {
            description:
              "Token inválido, expirado o reutilizado",
          },
        },
      },
    },

    "/api/sesion/logout": {
      post: {
        tags: ["Sesión"],
        summary: "Cerrar sesión",
        security: openSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RefreshToken",
              },
            },
          },
        },
        responses: {
          "200": {
            description:
              "Sesión cerrada",
          },
          "400": {
            description:
              "Falta refresh_token",
          },
        },
      },
    },

    "/api/sesion/perfil": {
      get: {
        tags: ["Sesión"],
        summary:
          "Perfil del usuario autenticado",
        security: bearerSecurity,
        responses: {
          "200": {
            description:
              "Perfil del usuario",
          },
          "401": unauthorizedResponse,
        },
      },
    },

    "/api/permisos": {
      get: {
        tags: ["Sesión"],
        summary:
          "Permisos efectivos del usuario",
        security: bearerSecurity,
        responses: {
          "200": {
            description:
              "Permisos efectivos",
          },
          "401": unauthorizedResponse,
        },
      },
    },
  },

  components: {
    schemas: {
      Login: {
        type: "object",
        required: [
          "identifier",
          "password",
        ],
        properties: {
          identifier: {
            type: "string",
            example: "admin",
          },
          password: {
            type: "string",
            format: "password",
            example: "Admin123!",
          },
        },
      },

      RefreshToken: {
        type: "object",
        required: ["refresh_token"],
        properties: {
          refresh_token: {
            type: "string",
            example: "token-opaco",
          },
        },
      },

      SessionTokens: {
        type: "object",
        properties: {
          access_token: {
            type: "string",
          },
          token_type: {
            type: "string",
            example: "Bearer",
          },
          expires_in: {
            type: "integer",
            example: 900,
          },
          refresh_token: {
            type: "string",
          },
          refresh_expires_in: {
            type: "integer",
            example: 604800,
          },
        },
      },
    },
  },
};
