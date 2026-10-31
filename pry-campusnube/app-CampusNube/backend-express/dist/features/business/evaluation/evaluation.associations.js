"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluation_model_1 = require("./evaluation.model");
const course_model_1 = require("../course/course.model");
evaluation_model_1.Evaluation.belongsTo(course_model_1.Course, {
    foreignKey: "course_id",
    as: "course",
});
course_model_1.Course.hasMany(evaluation_model_1.Evaluation, {
    foreignKey: "course_id",
    as: "evaluations",
});
//# sourceMappingURL=evaluation.associations.js.map