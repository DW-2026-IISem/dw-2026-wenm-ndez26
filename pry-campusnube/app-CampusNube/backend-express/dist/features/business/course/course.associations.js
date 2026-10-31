"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = require("./course.model");
const teacher_model_1 = require("../teacher/teacher.model");
course_model_1.Course.belongsToMany(teacher_model_1.Teacher, {
    through: "teacher_courses",
    foreignKey: "course_id",
    otherKey: "teacher_id",
    as: "teachers",
});
teacher_model_1.Teacher.belongsToMany(course_model_1.Course, {
    through: "teacher_courses",
    foreignKey: "teacher_id",
    otherKey: "course_id",
    as: "courses",
});
//# sourceMappingURL=course.associations.js.map