"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const course_repository_1 = require("./course.repository");
const course_service_1 = require("./course.service");
class CourseController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.courseService = new course_service_1.CourseService(new course_repository_1.CourseRepository());
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const courses = await this.courseService.getAll();
            res.status(200).json({ courses });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const course = await this.courseService.getOne(id);
            res.status(200).json({ course });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const dto = req.body;
            const course = await this.courseService.create(dto);
            res.status(201).json({ course });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const course = await this.courseService.updatePut(id, dto);
            res.status(200).json({ course });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const course = await this.courseService.updatePatch(id, dto);
            res.status(200).json({ course });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.courseService.deletePhysical(id);
            res.status(200).json({
                message: "Course permanently deleted",
                id,
            });
        });
    }
    /** Eliminación lógica → isActive = false */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const course = await this.courseService.deleteLogical(id);
            res.status(200).json({
                message: "Course deactivated (logical delete)",
                course,
            });
        });
    }
}
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map