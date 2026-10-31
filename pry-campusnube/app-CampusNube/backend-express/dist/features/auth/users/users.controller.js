"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const users_service_1 = require("./users.service");
/**
 * Capa Controller del feature Users.
 * Solo HTTP: lee `req`, llama al service y arma la respuesta.
 * El manejo de errores se delega en `run()` (ver `BaseController`).
 */
class UsersController extends base_controller_1.BaseController {
    constructor(service = new users_service_1.UsersService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(_req, res) {
        await this.run(res, async () => {
            const users = await this.service.getAll();
            res.status(200).json({ users });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const user = await this.service.getOne(this.paramId(req));
            res.status(200).json({ user });
        });
    }
    // ================== CREATE ==================
    async create(req, res) {
        await this.run(res, async () => {
            const user = await this.service.create(req.body);
            res.status(201).json({ user });
        });
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        await this.run(res, async () => {
            const user = await this.service.updatePut(this.paramId(req), req.body);
            res.status(200).json({ user });
        });
    }
    async updatePatch(req, res) {
        await this.run(res, async () => {
            const user = await this.service.updatePatch(this.paramId(req), req.body);
            res.status(200).json({ user });
        });
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.deletePhysical(id);
            res.status(200).json({ message: "User permanently deleted", id });
        });
    }
    /** Eliminación lógica -> `status = inactive`. */
    async deleteLogical(req, res) {
        await this.run(res, async () => {
            const user = await this.service.deleteLogical(this.paramId(req));
            res.status(200).json({ message: "User deactivated (logical delete)", user });
        });
    }
    // ================== IDENTIDAD Y PERMISOS ==================
    /** Cambio de credencial (exige la contraseña actual). */
    async changePassword(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.changePassword(id, req.body);
            res.status(200).json({ message: "Password updated", id });
        });
    }
    /** Permisos efectivos del usuario: recursos concedidos por sus roles activos. */
    async getEffectivePermissions(req, res) {
        await this.run(res, async () => {
            const permissions = await this.service.getEffectivePermissions(this.paramId(req));
            res.status(200).json({ permissions });
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map