"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enrollment_model_1 = require("./enrollment.model");
const learner_model_1 = require("../learner/learner.model");
const course_model_1 = require("../course/course.model");
enrollment_model_1.Enrollment.belongsTo(learner_model_1.Learner, {
    foreignKey: "learner_id",
    as: "learner",
});
learner_model_1.Learner.hasMany(enrollment_model_1.Enrollment, {
    foreignKey: "learner_id",
    as: "enrollments",
});
enrollment_model_1.Enrollment.belongsTo(course_model_1.Course, {
    foreignKey: "course_id",
    as: "course",
});
course_model_1.Course.hasMany(enrollment_model_1.Enrollment, {
    foreignKey: "course_id",
    as: "enrollments",
});
//# sourceMappingURL=enrollment.associations.js.map