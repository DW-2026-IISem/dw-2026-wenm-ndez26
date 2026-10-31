"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOpenApiDocument = buildOpenApiDocument;
exports.setupSwagger = setupSwagger;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// ============================================================
// Fase I — Business
// ============================================================
const learner_swagger_1 = require("../features/business/learner/learner.swagger");
const teacher_swagger_1 = require("../features/business/teacher/teacher.swagger");
const course_swagger_1 = require("../features/business/course/course.swagger");
const module_swagger_1 = require("../features/business/module/module.swagger");
const lesson_swagger_1 = require("../features/business/lesson/lesson.swagger");
const enrollment_swagger_1 = require("../features/business/enrollment/enrollment.swagger");
const evaluation_swagger_1 = require("../features/business/evaluation/evaluation.swagger");
const attempt_swagger_1 = require("../features/business/attempt/attempt.swagger");
const submission_swagger_1 = require("../features/business/submission/submission.swagger");
const progress_swagger_1 = require("../features/business/progress/progress.swagger");
const certificate_swagger_1 = require("../features/business/certificate/certificate.swagger");
// ============================================================
// Fase II — Auth con RBAC
// ============================================================
const session_swagger_1 = require("../features/auth/session/session.swagger");
const refresh_tokens_swagger_1 = require("../features/auth/refresh-tokens/refresh-tokens.swagger");
const users_swagger_1 = require("../features/auth/users/users.swagger");
const roles_swagger_1 = require("../features/auth/roles/roles.swagger");
const resources_swagger_1 = require("../features/auth/resources/resources.swagger");
const role_users_swagger_1 = require("../features/auth/role-users/role-users.swagger");
const resource_roles_swagger_1 = require("../features/auth/resource-roles/resource-roles.swagger");
const swagger_security_1 = require("../shared/http/swagger-security");
const swagger_security_2 = require("../shared/http/swagger-security");
/**
 * Registry externo:
 * importa la documentación OpenAPI de cada feature.
 *
 * Orden:
 * primero los módulos de seguridad,
 * después los módulos de negocio.
 */
const featureSwaggerModules = [
    // ==========================================================
    // Fase II — Auth con RBAC
    // ==========================================================
    session_swagger_1.sessionSwagger,
    refresh_tokens_swagger_1.refreshTokensSwagger,
    users_swagger_1.usersSwagger,
    roles_swagger_1.rolesSwagger,
    resources_swagger_1.resourcesSwagger,
    role_users_swagger_1.roleUsersSwagger,
    resource_roles_swagger_1.resourceRolesSwagger,
    // ==========================================================
    // Fase I — Business
    // ==========================================================
    learner_swagger_1.learnerSwagger,
    teacher_swagger_1.teacherSwagger,
    course_swagger_1.courseSwagger,
    module_swagger_1.moduleSwagger,
    lesson_swagger_1.lessonSwagger,
    enrollment_swagger_1.enrollmentSwagger,
    evaluation_swagger_1.evaluationSwagger,
    attempt_swagger_1.attemptSwagger,
    submission_swagger_1.submissionSwagger,
    progress_swagger_1.progressSwagger,
    certificate_swagger_1.certificateSwagger,
];
function buildOpenApiDocument() {
    const tags = [];
    const paths = {};
    const schemas = {};
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
            securitySchemes: swagger_security_1.bearerSecurityScheme,
            // Respuestas reutilizables.
            responses: {
                Unauthorized: swagger_security_2.unauthorizedResponse,
                Forbidden: swagger_security_2.forbiddenResponse,
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
function setupSwagger(app) {
    const document = buildOpenApiDocument();
    app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(document));
    app.get("/api/docs.json", (_req, res) => {
        res.json(document);
    });
    console.log("📘 Swagger UI: /api/docs  |  OpenAPI JSON: /api/docs.json");
}
//# sourceMappingURL=index.js.map