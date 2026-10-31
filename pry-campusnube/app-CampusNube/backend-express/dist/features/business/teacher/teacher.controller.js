"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const teacher_repository_1 = require("./teacher.repository");
const teacher_service_1 = require("./teacher.service");
class TeacherController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.teacherService = new teacher_service_1.TeacherService(new teacher_repository_1.TeacherRepository());
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const teachers = await this.teacherService.getAll();
            res.status(200).json({ teachers });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const teacher = await this.teacherService.getOne(id);
            res.status(200).json({ teacher });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const dto = req.body;
            const teacher = await this.teacherService.create(dto);
            res.status(201).json({ teacher });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const teacher = await this.teacherService.updatePut(id, dto);
            res.status(200).json({ teacher });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const teacher = await this.teacherService.updatePatch(id, dto);
            res.status(200).json({ teacher });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.teacherService.deletePhysical(id);
            res.status(200).json({
                message: "Teacher permanently deleted",
                id,
            });
        });
    }
    /** Eliminación lógica → isActive = false */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const teacher = await this.teacherService.deleteLogical(id);
            res.status(200).json({
                message: "Teacher deactivated (logical delete)",
                teacher,
            });
        });
    }
}
exports.TeacherController = TeacherController;
//# sourceMappingURL=teacher.controller.js.map