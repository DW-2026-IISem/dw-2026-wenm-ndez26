import { Application } from "express";

// ============================================================
// Fase I — Business
// ============================================================
import { LearnerRoutes } from "../features/business/learner/learner.routes";
import { TeacherRoutes } from "../features/business/teacher/teacher.routes";
import { CourseRoutes } from "../features/business/course/course.routes";
import { ModuleRoutes } from "../features/business/module/module.routes";
import { LessonRoutes } from "../features/business/lesson/lesson.routes";
import { EnrollmentRoutes } from "../features/business/enrollment/enrollment.routes";
import { EvaluationRoutes } from "../features/business/evaluation/evaluation.routes";
import { AttemptRoutes } from "../features/business/attempt/attempt.routes";
import { SubmissionRoutes } from "../features/business/submission/submission.routes";
import { ProgressRoutes } from "../features/business/progress/progress.routes";
import { CertificateRoutes } from "../features/business/certificate/certificate.routes";

// ============================================================
// Fase II — Auth con RBAC
// ============================================================
import { SessionRoutes } from "../features/auth/session/session.routes";
import { RefreshTokensRoutes } from "../features/auth/refresh-tokens/refresh-tokens.routes";
import { UsersRoutes } from "../features/auth/users/users.routes";
import { RolesRoutes } from "../features/auth/roles/roles.routes";
import { ResourcesRoutes } from "../features/auth/resources/resources.routes";
import { RoleUsersRoutes } from "../features/auth/role-users/role-users.routes";
import { ResourceRolesRoutes } from "../features/auth/resource-roles/resource-roles.routes";

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
export class Routes {
  // ==========================================================
  // Fase I — Business
  // ==========================================================
  public learnerRoutes: LearnerRoutes = new LearnerRoutes();
  public teacherRoutes: TeacherRoutes = new TeacherRoutes();
  public courseRoutes: CourseRoutes = new CourseRoutes();
  public moduleRoutes: ModuleRoutes = new ModuleRoutes();
  public lessonRoutes: LessonRoutes = new LessonRoutes();
  public enrollmentRoutes: EnrollmentRoutes = new EnrollmentRoutes();
  public evaluationRoutes: EvaluationRoutes = new EvaluationRoutes();
  public attemptRoutes: AttemptRoutes = new AttemptRoutes();
  public submissionRoutes: SubmissionRoutes = new SubmissionRoutes();
  public progressRoutes: ProgressRoutes = new ProgressRoutes();
  public certificateRoutes: CertificateRoutes = new CertificateRoutes();

  // ==========================================================
  // Fase II — Auth con RBAC
  // ==========================================================
  public sessionRoutes: SessionRoutes = new SessionRoutes();
  public refreshTokensRoutes: RefreshTokensRoutes =
    new RefreshTokensRoutes();
  public usersRoutes: UsersRoutes = new UsersRoutes();
  public rolesRoutes: RolesRoutes = new RolesRoutes();
  public resourcesRoutes: ResourcesRoutes = new ResourcesRoutes();
  public roleUsersRoutes: RoleUsersRoutes = new RoleUsersRoutes();
  public resourceRolesRoutes: ResourceRolesRoutes =
    new ResourceRolesRoutes();

  /**
   * Registra todas las rutas de CampusNube en la aplicación.
   *
   * El orden de registro mantiene primero Business y después
   * Auth, siguiendo la organización por fases del laboratorio.
   */
  public register(app: Application): void {
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
