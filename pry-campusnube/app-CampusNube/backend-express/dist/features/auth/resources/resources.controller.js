"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const resources_service_1 = require("./resources.service");
/**
 * Capa Controller del feature Resources.
 * Solo HTTP: lee `req`, llama al service y arma la respuesta.
 */
class ResourcesController extends base_controller_1.BaseController {
    constructor(service = new resources_service_1.ResourcesService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const resources = await this.service.getAll();
            res.status(200).json({ resources });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const resource = await this.service.getOne(this.paramId(req));
            res.status(200).json({ resource });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const resource = await this.service.create(req.body);
            res.status(201).json({ resource });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const resource = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ resource });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const resource = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ resource });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({
                message: "Resource permanently deleted",
                id,
            });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const resource = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({
                message: "Resource deactivated (logical delete)",
                resource,
            });
        });
    }
}
exports.ResourcesController = ResourcesController;
//# sourceMappingURL=resources.controller.js.map