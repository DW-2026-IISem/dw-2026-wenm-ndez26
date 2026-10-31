"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const module_repository_1 = require("./module.repository");
const module_service_1 = require("./module.service");
class ModuleController extends base_controller_1.BaseController {
    constructor() {
        super();
        this.moduleService = new module_service_1.ModuleService(new module_repository_1.ModuleRepository());
    }
    async getAll(req, res) {
        await this.run(res, async () => {
            const modules = await this.moduleService.getAll();
            res.status(200).json({ modules });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const module = await this.moduleService.getOne(id);
            res.status(200).json({ module });
        });
    }
    async create(req, res) {
        await this.run(res, async () => {
            const dto = req.body;
            const module = await this.moduleService.create(dto);
            res.status(201).json({ module });
        });
    }
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const module = await this.moduleService.updatePut(id, dto);
            res.status(200).json({ module });
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const dto = req.body;
            const module = await this.moduleService.updatePatch(id, dto);
            res.status(200).json({ module });
        });
    }
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.moduleService.deletePhysical(id);
            res.status(200).json({
                message: "Module permanently deleted",
                id,
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const module = await this.moduleService.deleteLogical(id);
            res.status(200).json({
                message: "Module deactivated (logical delete)",
                module,
            });
        });
    }
}
exports.ModuleController = ModuleController;
//# sourceMappingURL=module.controller.js.map