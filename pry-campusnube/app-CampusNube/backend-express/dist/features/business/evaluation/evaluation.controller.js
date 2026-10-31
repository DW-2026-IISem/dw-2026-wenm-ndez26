"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const evaluation_repository_1 = require("./evaluation.repository");
const evaluation_service_1 = require("./evaluation.service");
class EvaluationController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.evaluationService = new evaluation_service_1.EvaluationService(new evaluation_repository_1.EvaluationRepository());
    }
    async getAll(req, res) {
        await this.run(res, async () => {
            const evaluations = await this.evaluationService.getAll();
            res.status(200).json({ evaluations });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const evaluation = await this.evaluationService.getOne(id);
            res.status(200).json({ evaluation });
        });
    }
    async create(req, res) {
        await this.run(res, async () => {
            const dto = req.body;
            const evaluation = await this.evaluationService.create(dto);
            res.status(201).json({ evaluation });
        });
    }
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const evaluation = await this.evaluationService.updatePut(id, dto);
            res.status(200).json({ evaluation });
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const evaluation = await this.evaluationService.updatePatch(id, dto);
            res.status(200).json({ evaluation });
        });
    }
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.evaluationService.deletePhysical(id);
            res.status(200).json({
                message: "Evaluation permanently deleted",
                id,
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const evaluation = await this.evaluationService.deleteLogical(id);
            res.status(200).json({
                message: "Evaluation deactivated (logical delete)",
                evaluation,
            });
        });
    }
}
exports.EvaluationController = EvaluationController;
//# sourceMappingURL=evaluation.controller.js.map