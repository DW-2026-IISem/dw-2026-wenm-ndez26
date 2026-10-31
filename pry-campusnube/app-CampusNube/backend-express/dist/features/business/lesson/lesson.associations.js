"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lesson_model_1 = require("./lesson.model");
const module_model_1 = require("../module/module.model");
lesson_model_1.Lesson.belongsTo(module_model_1.Module, {
    foreignKey: "module_id",
    as: "module",
});
module_model_1.Module.hasMany(lesson_model_1.Lesson, {
    foreignKey: "module_id",
    as: "lessons",
});
//# sourceMappingURL=lesson.associations.js.map