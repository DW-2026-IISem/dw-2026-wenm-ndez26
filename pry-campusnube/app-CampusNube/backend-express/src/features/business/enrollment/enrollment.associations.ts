import { Enrollment } from "./enrollment.model";
import { Learner } from "../learner/learner.model";
import { Course } from "../course/course.model";

Enrollment.belongsTo(Learner, {
  foreignKey: "learner_id",
  as: "learner",
});

Learner.hasMany(Enrollment, {
  foreignKey: "learner_id",
  as: "enrollments",
});

Enrollment.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});

Course.hasMany(Enrollment, {
  foreignKey: "course_id",
  as: "enrollments",
});