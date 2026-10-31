"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const module_model_1 = require("../module/module.model");
const lesson_repository_1 = require("./lesson.repository");
const dto_1 = require("./dto");
class LessonService {
    constructor() {
        this.repository = new lesson_repository_1.LessonRepository();
    }
    async getAll() {
        const lessons = await this.repository.findAll();
        return lessons.map(dto_1.toLessonResponseDto);
    }
    async findOrFail(id) {
        const lesson = await this.repository.findById(id);
        if (!lesson) {
            throw new app_error_1.AppError(404, "Lección no encontrada");
        }
        return lesson;
    }
    async validateActiveModule(moduleId) {
        const module = await module_model_1.Module.findOne({
            where: {
                id: moduleId,
                isActive: true,
            },
        });
        if (!module) {
            throw new app_error_1.AppError(400, "El módulo no existe o no está activo");
        }
    }
    async getOne(id) {
        const lesson = await this.findOrFail(id);
        return (0, dto_1.toLessonResponseDto)(lesson);
    }
    async create(data) {
        await this.validateActiveModule(data.module_id);
        const lesson = await this.repository.create(data);
        return (0, dto_1.toLessonResponseDto)(lesson);
    }
    async update(id, data) {
        const lesson = await this.findOrFail(id);
        await this.validateActiveModule(data.module_id);
        const updatedLesson = await this.repository.update(lesson, data);
        return (0, dto_1.toLessonResponseDto)(updatedLesson);
    }
    async patch(id, data) {
        const lesson = await this.findOrFail(id);
        if (data.module_id !== undefined) {
            await this.validateActiveModule(data.module_id);
        }
        const updatedLesson = await this.repository.patch(lesson, data);
        return (0, dto_1.toLessonResponseDto)(updatedLesson);
    }
    async delete(id) {
        const lesson = await this.findOrFail(id);
        await this.repository.delete(lesson);
    }
    async deactivate(id) {
        const lesson = await this.findOrFail(id);
        const deactivatedLesson = await this.repository.deactivate(lesson);
        return (0, dto_1.toLessonResponseDto)(deactivatedLesson);
    }
}
exports.LessonService = LessonService;
//# sourceMappingURL=lesson.service.js.map