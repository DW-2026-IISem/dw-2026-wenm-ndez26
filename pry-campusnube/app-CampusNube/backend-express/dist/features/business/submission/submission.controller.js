"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const base_controller_1 = require("../../../shared/http/base-controller");
const submission_service_1 = require("./submission.service");
/**
 * Controller de Submission.
 *
 * Solo maneja HTTP:
 * req -> service -> res.
 */
class SubmissionController extends base_controller_1.BaseController {
    constructor(service = new submission_service_1.SubmissionService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const submissions = await this.service.getAll();
            res.status(200).json({
                submissions,
            });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const submission = await this.service.getOne(id);
            res.status(200).json({
                submission,
            });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const body = req.body;
            if (body.referencia_id === undefined ||
                !body.lesson_id ||
                !body.enrollment_id ||
                !body.fecha_inicio ||
                !body.estado) {
                throw new app_error_1.AppError(400, "referencia_id, lesson_id, enrollment_id, fecha_inicio y estado son obligatorios");
            }
            const submission = await this.service.create(body);
            res.status(201).json({
                submission,
            });
        });
    }
    // ================== UPDATE ==================
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const body = req.body;
            if (body.referencia_id === undefined ||
                !body.lesson_id ||
                !body.enrollment_id ||
                !body.fecha_inicio) {
                throw new app_error_1.AppError(400, "referencia_id, lesson_id, enrollment_id y fecha_inicio son obligatorios");
            }
            const submission = await this.service.update(id, body);
            res.status(200).json({
                submission,
            });
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const body = req.body;
            const submission = await this.service.patch(id, body);
            res.status(200).json({
                submission,
            });
        });
    }
    // ================== DELETE ==================
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.delete(id);
            res.status(200).json({
                message: "Entrega eliminada correctamente",
                id,
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const submission = await this.service.deactivate(id);
            res.status(200).json({
                message: "Entrega desactivada correctamente",
                submission,
            });
        });
    }
}
exports.SubmissionController = SubmissionController;
//# sourceMappingURL=submission.controller.js.map