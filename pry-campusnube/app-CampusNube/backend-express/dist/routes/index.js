"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
// ============================================================
// Fase I — Business
// ============================================================
const learner_routes_1 = require("../features/business/learner/learner.routes");
const teacher_routes_1 = require("../features/business/teacher/teacher.routes");
const course_routes_1 = require("../features/business/course/course.routes");
const module_routes_1 = require("../features/business/module/module.routes");
const lesson_routes_1 = require("../features/business/lesson/lesson.routes");
const enrollment_routes_1 = require("../features/business/enrollment/enrollment.routes");
const evaluation_routes_1 = require("../features/business/evaluation/evaluation.routes");
const attempt_routes_1 = require("../features/business/attempt/attempt.routes");
const submission_routes_1 = require("../features/business/submission/submission.routes");
const progress_routes_1 = require("../features/business/progress/progress.routes");
const certificate_routes_1 = require("../features/business/certificate/certificate.routes");
// ============================================================
// Fase II — Auth con RBAC
// ============================================================
const session_routes_1 = require("../features/auth/session/session.routes");
const refresh_tokens_routes_1 = require("../features/auth/refresh-tokens/refresh-tokens.routes");
const users_routes_1 = require("../features/auth/users/users.routes");
const roles_routes_1 = require("../features/auth/roles/roles.routes");
const resources_routes_1 = require("../features/auth/resources/resources.routes");
const role_users_routes_1 = require("../features/auth/role-users/role-users.routes");
const resource_roles_routes_1 = require("../features/auth/resource-roles/resource-roles.routes");
/**
 * Registro de features.
 *
 * Cada feature expone sus propias rutas y decide su
 * modalidad de acceso (OPEN, JWT o JWT + RBAC)
 * mediante sus middlewares.
 *
 * Fase I  — Business: 11 features.
 *
 * Fase II — Auth: 7 features:
 * sesión, sesiones renovables, usuarios, roles,
 * recursos, asignaciones de rol y concesiones de recursos.
 */
class Routes {
    constructor() {
        // ==========================================================
        // Fase I — Business
        // ==========================================================
        this.learnerRoutes = new learner_routes_1.LearnerRoutes();
        this.teacherRoutes = new teacher_routes_1.TeacherRoutes();
        this.courseRoutes = new course_routes_1.CourseRoutes();
        this.moduleRoutes = new module_routes_1.ModuleRoutes();
        this.lessonRoutes = new lesson_routes_1.LessonRoutes();
        this.enrollmentRoutes = new enrollment_routes_1.EnrollmentRoutes();
        this.evaluationRoutes = new evaluation_routes_1.EvaluationRoutes();
        this.attemptRoutes = new attempt_routes_1.AttemptRoutes();
        this.submissionRoutes = new submission_routes_1.SubmissionRoutes();
        this.progressRoutes = new progress_routes_1.ProgressRoutes();
        this.certificateRoutes = new certificate_routes_1.CertificateRoutes();
        // ==========================================================
        // Fase II — Auth con RBAC
        // ==========================================================
        this.sessionRoutes = new session_routes_1.SessionRoutes();
        this.refreshTokensRoutes = new refresh_tokens_routes_1.RefreshTokensRoutes();
        this.usersRoutes = new users_routes_1.UsersRoutes();
        this.rolesRoutes = new roles_routes_1.RolesRoutes();
        this.resourcesRoutes = new resources_routes_1.ResourcesRoutes();
        this.roleUsersRoutes = new role_users_routes_1.RoleUsersRoutes();
        this.resourceRolesRoutes = new resource_roles_routes_1.ResourceRolesRoutes();
    }
    /**
     * Registra todas las rutas de CampusNube en la aplicación.
     *
     * El orden de registro mantiene primero Business y después
     * Auth, siguiendo la organización por fases del laboratorio.
     */
    register(app) {
        // ========================================================
        // Fase I — Business
        // ========================================================
        this.learnerRoutes.routes(app);
        this.teacherRoutes.routes(app);
        this.courseRoutes.routes(app);
        this.moduleRoutes.routes(app);
        this.lessonRoutes.routes(app);
        this.enrollmentRoutes.routes(app);
        this.evaluationRoutes.routes(app);
        this.attemptRoutes.routes(app);
        this.submissionRoutes.routes(app);
        this.progressRoutes.routes(app);
        this.certificateRoutes.routes(app);
        // ========================================================
        // Fase II — Auth con RBAC
        // ========================================================
        this.sessionRoutes.routes(app);
        this.refreshTokensRoutes.routes(app);
        this.usersRoutes.routes(app);
        this.rolesRoutes.routes(app);
        this.resourcesRoutes.routes(app);
        this.roleUsersRoutes.routes(app);
        this.resourceRolesRoutes.routes(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map