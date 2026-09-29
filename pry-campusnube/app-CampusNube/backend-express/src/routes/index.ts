import { LearnerRoutes } from "../features/business/learner/learner.routes";
import { TeacherRoutes } from "../features/business/teacher/teacher.routes";
import { CourseRoutes } from "../features/business/course/course.routes";

export class Routes {
  public learnerRoutes: LearnerRoutes = new LearnerRoutes();
  public teacherRoutes: TeacherRoutes = new TeacherRoutes();
  public courseRoutes: CourseRoutes = new CourseRoutes();
}