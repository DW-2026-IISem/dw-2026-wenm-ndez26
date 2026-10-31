"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const enrollment_repository_1 = require("./enrollment.repository");
const enrollment_service_1 = require("./enrollment.service");
class EnrollmentController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.enrollmentService = new enrollment_service_1.EnrollmentService(new enrollment_repository_1.EnrollmentRepository());
    }
    async getAll(req, res) {
        await this.run(res, async () => {
            const enrollments = await this.enrollmentService.getAll();
            res.status(200).json({ enrollments });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const enrollment = await this.enrollmentService.getOne(id);
            res.status(200).json({ enrollment });
        });
    }
    async create(req, res) {
        await this.run(res, async () => {
            const dto = req.body;
            const enrollment = await this.enrollmentService.create(dto);
            res.status(201).json({ enrollment });
        });
    }
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const enrollment = await this.enrollmentService.updatePut(id, dto);
            res.status(200).json({ enrollment });
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const enrollment = await this.enrollmentService.updatePatch(id, dto);
            res.status(200).json({ enrollment });
        });
    }
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.enrollmentService.deletePhysical(id);
            res.status(200).json({
                message: "Enrollment permanently deleted",
                id,
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const enrollment = await this.enrollmentService.deleteLogical(id);
            res.status(200).json({
                message: "Enrollment deactivated (logical delete)",
                enrollment,
            });
        });
    }
}
exports.EnrollmentController = EnrollmentController;
//# sourceMappingURL=enrollment.controller.js.map