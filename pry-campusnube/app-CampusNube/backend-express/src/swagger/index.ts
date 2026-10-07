import { Application } from "express";
import swaggerUi from "swagger-ui-express";

// ============================================================
// Fase I — Business
// ============================================================
import { learnerSwagger } from "../features/business/learner/learner.swagger";
import { teacherSwagger } from "../features/business/teacher/teacher.swagger";
import { courseSwagger } from "../features/business/course/course.swagger";
import { moduleSwagger } from "../features/business/module/module.swagger";
import { lessonSwagger } from "../features/business/lesson/lesson.swagger";
import { enrollmentSwagger } from "../features/business/enrollment/enrollment.swagger";
import { evaluationSwagger } from "../features/business/evaluation/evaluation.swagger";
import { attemptSwagger } from "../features/business/attempt/attempt.swagger";
import { submissionSwagger } from "../features/business/submission/submission.swagger";
import { progressSwagger } from "../features/business/progress/progress.swagger";
import { certificateSwagger } from "../features/business/certificate/certificate.swagger";

// ============================================================
// Fase II — Auth con RBAC
// ============================================================
import { sessionSwagger } from "../features/auth/session/session.swagger";
import { refreshTokensSwagger } from "../features/auth/refresh-tokens/refresh-tokens.swagger";
import { usersSwagger } from "../features/auth/users/users.swagger";
import { rolesSwagger } from "../features/auth/roles/roles.swagger";
import { resourcesSwagger } from "../features/auth/resources/resources.swagger";
import { roleUsersSwagger } from "../features/auth/role-users/role-users.swagger";
import { resourceRolesSwagger } from "../features/auth/resource-roles/resource-roles.swagger";

import { bearerSecurityScheme } from "../shared/http/swagger-security";
import {
  unauthorizedResponse,
  forbiddenResponse,
} from "../shared/http/swagger-security";

export type FeatureSwaggerModule = {
  tags: unknown[];
  paths: Record<string, unknown>;
  components?: {
    schemas?: Record<string, unknown>;
  };
};

/**
 * Registry externo:
 * importa la documentación OpenAPI de cada feature.
 *
 * Orden:
 * primero los módulos de seguridad,
 * después los módulos de negocio.
 */
const featureSwaggerModules: FeatureSwaggerModule[] = [
  // ==========================================================
  // Fase II — Auth con RBAC
  // ==========================================================
  sessionSwagger,
  refreshTokensSwagger,
  usersSwagger,
  rolesSwagger,
  resourcesSwagger,
  roleUsersSwagger,
  resourceRolesSwagger,

  // ==========================================================
  // Fase I — Business
  // ==========================================================
  learnerSwagger,
  teacherSwagger,
  courseSwagger,
  moduleSwagger,
  lessonSwagger,
  enrollmentSwagger,
  evaluationSwagger,
  attemptSwagger,
  submissionSwagger,
  progressSwagger,
  certificateSwagger,
];

export function buildOpenApiDocument() {
  const tags: unknown[] = [];
  const paths: Record<string, unknown> = {};
  const schemas: Record<string, unknown> = {};

  for (const mod of featureSwaggerModules) {
    tags.push(...mod.tags);

    Object.assign(paths, mod.paths);

    if (mod.components?.schemas) {
      Object.assign(schemas, mod.components.schemas);
    }
  }

  return {
    openapi: "3.0.3",

    info: {
      title: "CampusNube API",
      version: "2.0.0",
      description: [
        "API CampusNube (Express + Sequelize) con **Auth con RBAC**.",
        "",
        "**Las tres modalidades de acceso** (se declaran por operación, no globalmente):",
        "",
        "- **OPEN** — sin identidad previa: `POST /api/sesion/login`, `/refresh`, `/logout`.",
        "- **JWT** — token de acceso válido: `/api/sesion/perfil`, `/api/permisos`, `/api/sesiones/*`.",
        "- **JWT + RBAC** — token válido **y** concesión activa de `(method, path)`.",
        "",
        "Autenticación: obtener el `access_token` en `POST /api/sesion/login` y pulsar **Authorize** con " +
          "`Bearer <access_token>`.",
        "",
        "La autorización aplica **deny by default**: sin concesión explícita, 403.",
        "",
        "CampusNube — Aprendizaje virtual.",
      ].join("\n"),
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4000}`,
        description: "Local",
      },
    ],

    tags,

    paths,

    // Postura *secure by default*:
    // cualquier operación que no declare su propio `security`
    // exige el access token.
    //
    // Los endpoints OPEN (login/refresh/logout)
    // lo anulan explícitamente con `security: []`.
    security: [{ bearerAuth: [] }],

  components: {
  // Esquemas de seguridad:
  // Authorization: Bearer <access_token>
  securitySchemes: bearerSecurityScheme,

  // Respuestas reutilizables.
  responses: {
    Unauthorized: unauthorizedResponse,
    Forbidden: forbiddenResponse,
  },

  schemas,
},
  };
}

/**
 * Monta Swagger UI y el JSON OpenAPI.
 *
 * UI:
 *   GET /api/docs
 *
 * JSON:
 *   GET /api/docs.json
 */
export function setupSwagger(app: Application): void {
  const document = buildOpenApiDocument();

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(document)
  );

  app.get("/api/docs.json", (_req, res) => {
    res.json(document);
  });

  console.log(
    "📘 Swagger UI: /api/docs  |  OpenAPI JSON: /api/docs.json"
  );
}
