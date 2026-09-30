import { Module } from "./module.model";
import { Course } from "../course/course.model";

Module.belongsTo(Course, {
  foreignKey: "course_id",
  as: "course",
});

Course.hasMany(Module, {
  foreignKey: "course_id",
  as: "modules",
});
