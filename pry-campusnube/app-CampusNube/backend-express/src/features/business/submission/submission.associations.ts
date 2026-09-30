import { Submission } from "./submission.model";
import { Lesson } from "../lesson/lesson.model";
import { Enrollment } from "../enrollment/enrollment.model";

Submission.belongsTo(Lesson, {
  foreignKey: "lesson_id",
  as: "lesson",
});

Lesson.hasMany(Submission, {
  foreignKey: "lesson_id",
  as: "submissions",
});

Submission.belongsTo(Enrollment, {
  foreignKey: "enrollment_id",
  as: "enrollment",
});

Enrollment.hasMany(Submission, {
  foreignKey: "enrollment_id",
  as: "submissions",
});
