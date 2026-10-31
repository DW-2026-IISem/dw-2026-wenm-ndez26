"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_model_1 = require("./module.model");
const course_model_1 = require("../course/course.model");
module_model_1.Module.belongsTo(course_model_1.Course, {
    foreignKey: "course_id",
    as: "course",
});
course_model_1.Course.hasMany(module_model_1.Module, {
    foreignKey: "course_id",
    as: "modules",
});
//# sourceMappingURL=module.associations.js.map