"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submission_model_1 = require("./submission.model");
const lesson_model_1 = require("../lesson/lesson.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
submission_model_1.Submission.belongsTo(lesson_model_1.Lesson, {
    foreignKey: "lesson_id",
    as: "lesson",
});
lesson_model_1.Lesson.hasMany(submission_model_1.Submission, {
    foreignKey: "lesson_id",
    as: "submissions",
});
submission_model_1.Submission.belongsTo(enrollment_model_1.Enrollment, {
    foreignKey: "enrollment_id",
    as: "enrollment",
});
enrollment_model_1.Enrollment.hasMany(submission_model_1.Submission, {
    foreignKey: "enrollment_id",
    as: "submissions",
});
//# sourceMappingURL=submission.associations.js.map