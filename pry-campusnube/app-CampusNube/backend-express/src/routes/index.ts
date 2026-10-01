import { LearnerRoutes } from "../features/business/learner/learner.routes";
import { TeacherRoutes } from "../features/business/teacher/teacher.routes";
import { CourseRoutes } from "../features/business/course/course.routes";
import { EnrollmentRoutes } from "../features/business/enrollment/enrollment.routes";
import { EvaluationRoutes } from "../features/business/evaluation/evaluation.routes";
import { ModuleRoutes } from "../features/business/module/module.routes";
import { LessonRoutes } from "../features/business/lesson/lesson.routes";
import { AttemptRoutes } from "../features/business/attempt/attempt.routes";
import { SubmissionRoutes } from "../features/business/submission/submission.routes";
import { ProgressRoutes } from "../features/business/progress/progress.routes";
import { CertificateRoutes } from "../features/business/certificate/certificate.routes";

export class Routes {
  public learnerRoutes: LearnerRoutes = new LearnerRoutes();
  public teacherRoutes: TeacherRoutes = new TeacherRoutes();
  public courseRoutes: CourseRoutes = new CourseRoutes();
  public enrollmentRoutes: EnrollmentRoutes = new EnrollmentRoutes();
  public evaluationRoutes: EvaluationRoutes = new EvaluationRoutes();
  public moduleRoutes: ModuleRoutes = new ModuleRoutes();
  public lessonRoutes: LessonRoutes = new LessonRoutes();
  public attemptRoutes: AttemptRoutes = new AttemptRoutes();
  public submissionRoutes: SubmissionRoutes = new SubmissionRoutes();
  public progressRoutes: ProgressRoutes = new ProgressRoutes();
  public certificateRoutes: CertificateRoutes =   new CertificateRoutes();
}