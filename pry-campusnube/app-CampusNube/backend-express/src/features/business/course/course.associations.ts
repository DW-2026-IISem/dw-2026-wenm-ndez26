import { Course } from "./course.model";
import { Teacher } from "../teacher/teacher.model";

Course.belongsToMany(Teacher, {
  through: "teacher_courses",
  foreignKey: "course_id",
  otherKey: "teacher_id",
  as: "teachers",
});

Teacher.belongsToMany(Course, {
  through: "teacher_courses",
  foreignKey: "teacher_id",
  otherKey: "course_id",
  as: "courses",
});
