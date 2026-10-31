"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const base_controller_1 = require("../../../shared/http/base-controller");
const progress_service_1 = require("./progress.service");
/**
 * Controller de Progress.
 *
 * Solo maneja HTTP:
 * req -> service -> res.
 */
class ProgressController extends base_controller_1.BaseController {
    constructor(service = new progress_service_1.ProgressService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const progress = await this.service.getAll();
            res.status(200).json({
                progress,
            });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const progress = await this.service.getOne(id);
            res.status(200).json({
                progress,
            });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const body = req.body;
            if (!body.enrollment_id) {
                throw new app_error_1.AppError(400, "El campo enrollment_id es obligatorio");
            }
            if (!body.name) {
                throw new app_error_1.AppError(400, "El campo name es obligatorio");
            }
            const progress = await this.service.create(body);
            res.status(201).json({
                progress,
            });
        });
    }
    // ================== UPDATE ==================
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const body = req.body;
            if (!body.enrollment_id) {
                throw new app_error_1.AppError(400, "El campo enrollment_id es obligatorio");
            }
            if (!body.name) {
                throw new app_error_1.AppError(400, "El campo name es obligatorio");
            }
            const progress = await this.service.update(id, body);
            res.status(200).json({
                progress,
            });
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const body = req.body;
            const progress = await this.service.patch(id, body);
            res.status(200).json({
                progress,
            });
        });
    }
    // ================== DELETE ==================
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.delete(id);
            res.status(200).json({
                message: "Progreso eliminado correctamente",
                id,
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const progress = await this.service.deactivate(id);
            res.status(200).json({
                message: "Progreso desactivado correctamente",
                progress,
            });
        });
    }
}
exports.ProgressController = ProgressController;
//# sourceMappingURL=progress.controller.js.map