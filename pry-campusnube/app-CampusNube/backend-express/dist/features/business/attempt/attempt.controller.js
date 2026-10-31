"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptController = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const base_controller_1 = require("../../../shared/http/base-controller");
const attempt_service_1 = require("./attempt.service");
class AttemptController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.service = new attempt_service_1.AttemptService();
    }
    async getAll(_req, res) {
        await this.run(res, async () => {
            const attempts = await this.service.getAll();
            res.status(200).json(attempts);
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const attempt = await this.service.getOne(id);
            res.status(200).json(attempt);
        });
    }
    async create(req, res) {
        await this.run(res, async () => {
            const data = req.body;
            if (!data.enrollment_id || !data.name) {
                throw new app_error_1.AppError(400, "enrollment_id y name son obligatorios");
            }
            const attempt = await this.service.create(data);
            res.status(201).json(attempt);
        });
    }
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const data = req.body;
            if (!data.enrollment_id || !data.name) {
                throw new app_error_1.AppError(400, "enrollment_id y name son obligatorios");
            }
            const attempt = await this.service.update(id, data);
            res.status(200).json(attempt);
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const data = req.body;
            const attempt = await this.service.patch(id, data);
            res.status(200).json(attempt);
        });
    }
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.delete(id);
            res.status(200).json({
                message: "Intento eliminado correctamente",
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const attempt = await this.service.deactivate(id);
            res.status(200).json({
                message: "Intento desactivado correctamente",
                attempt,
            });
        });
    }
}
exports.AttemptController = AttemptController;
//# sourceMappingURL=attempt.controller.js.map