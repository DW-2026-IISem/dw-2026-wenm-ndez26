"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const learner_service_1 = require("./learner.service");
const learner_repository_1 = require("./learner.repository");
class LearnerController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.learnerService = new learner_service_1.LearnerService(new learner_repository_1.LearnerRepository());
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const learners = await this.learnerService.getAll();
            res.status(200).json({ learners });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const learner = await this.learnerService.getOne(id);
            res.status(200).json({ learner });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const dto = req.body;
            const learner = await this.learnerService.create(dto);
            res.status(201).json({ learner });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const learner = await this.learnerService.updatePut(id, dto);
            res.status(200).json({ learner });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const learner = await this.learnerService.updatePatch(id, dto);
            res.status(200).json({ learner });
        });
    }
    // ================== DELETE ==================
    /**
     * Eliminación física.
     */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.learnerService.deletePhysical(id);
            res.status(200).json({
                message: "Learner permanently deleted",
                id,
            });
        });
    }
    /**
     * Eliminación lógica → status = inactive.
     */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const learner = await this.learnerService.deleteLogical(id);
            res.status(200).json({
                message: "Learner deactivated (logical delete)",
                learner,
            });
        });
    }
}
exports.LearnerController = LearnerController;
//# sourceMappingURL=learner.controller.js.map