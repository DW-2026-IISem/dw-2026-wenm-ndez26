"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonController = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const base_controller_1 = require("../../../shared/http/base-controller");
const lesson_service_1 = require("./lesson.service");
class LessonController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.service = new lesson_service_1.LessonService();
    }
    async getAll(_req, res) {
        await this.run(res, async () => {
            const lessons = await this.service.getAll();
            res.status(200).json(lessons);
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const lesson = await this.service.getOne(id);
            res.status(200).json(lesson);
        });
    }
    async create(req, res) {
        await this.run(res, async () => {
            const data = req.body;
            if (!data.module_id || !data.name) {
                throw new app_error_1.AppError(400, "module_id y name son obligatorios");
            }
            const lesson = await this.service.create(data);
            res.status(201).json(lesson);
        });
    }
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const data = req.body;
            if (!data.module_id || !data.name) {
                throw new app_error_1.AppError(400, "module_id y name son obligatorios");
            }
            const lesson = await this.service.update(id, data);
            res.status(200).json(lesson);
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const data = req.body;
            const lesson = await this.service.patch(id, data);
            res.status(200).json(lesson);
        });
    }
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.delete(id);
            res.status(200).json({
                message: "Lección eliminada correctamente",
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const lesson = await this.service.deactivate(id);
            res.status(200).json({
                message: "Lección desactivada correctamente",
                lesson,
            });
        });
    }
}
exports.LessonController = LessonController;
//# sourceMappingURL=lesson.controller.js.map