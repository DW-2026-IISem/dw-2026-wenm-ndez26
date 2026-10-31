"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRepository = void 0;
const module_model_1 = require("../module/module.model");
const lesson_model_1 = require("./lesson.model");
class LessonRepository {
    async findAll() {
        return lesson_model_1.Lesson.findAll({
            where: {
                isActive: true,
            },
        });
    }
    async findById(id) {
        return lesson_model_1.Lesson.findOne({
            where: {
                id,
                isActive: true,
            },
        });
    }
    async findActiveModule(moduleId) {
        return module_model_1.Module.findOne({
            where: {
                id: moduleId,
                isActive: true,
            },
        });
    }
    async create(data) {
        return lesson_model_1.Lesson.create({
            module_id: data.module_id,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true,
        });
    }
    async update(lesson, data) {
        await lesson.update(data);
        return lesson;
    }
    async patch(lesson, data) {
        await lesson.update(data);
        return lesson;
    }
    async delete(lesson) {
        await lesson.destroy();
    }
    async deactivate(lesson) {
        await lesson.update({
            isActive: false,
        });
        return lesson;
    }
}
exports.LessonRepository = LessonRepository;
//# sourceMappingURL=lesson.repository.js.map