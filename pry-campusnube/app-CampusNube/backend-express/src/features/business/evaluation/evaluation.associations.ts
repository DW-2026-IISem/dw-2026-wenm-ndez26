import { Evaluation } from "./evaluation.model";
import { Course } from "../course/course.model";

Evaluation.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});

Course.hasMany(Evaluation, {
  foreignKey: "course_id",
  as: "evaluations",
});
