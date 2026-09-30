import { Lesson } from "./lesson.model";
import { Module } from "../module/module.model";

Lesson.belongsTo(Module, {
  foreignKey: "module_id",
  as: "module",
});

Module.hasMany(Lesson, {
  foreignKey: "module_id",
  as: "lessons",
});
