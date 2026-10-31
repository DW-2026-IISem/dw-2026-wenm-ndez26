"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRolesController = void 0;
const base_controller_1 = require("../../../shared/http/base-controller");
const resource_roles_service_1 = require("./resource-roles.service");
/**
 * Capa Controller del feature ResourceRoles.
 *
 * Orden de operaciones: getAll → getOne → grant (create) → deactivate → reactivate.
 * `GET /api/concesiones-rol` acepta filtros `?role_id=` y `?resource_id=`.
 */
class ResourceRolesController extends base_controller_1.BaseController {
    constructor(service = new resource_roles_service_1.ResourceRolesService()) {
        super();
        this.service = service;
    }
    // ================== READ ==================
    async getAll(req, res) {
        await this.run(res, async () => {
            const grants = await this.service.getAll({
                role_id: toOptionalNumber(req.query.role_id),
                resource_id: toOptionalNumber(req.query.resource_id),
            });
            res.status(200).json({ grants });
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const grant = await this.service.getOne(this.paramId(req));
            res.status(200).json({ grant });
        });
    }
    // ================== CREATE (conceder permiso) ==================
    async grant(req, res) {
        await this.run(res, async () => {
            const grant = await this.service.grant(req.body);
            res.status(201).json({
                message: "Resource granted to role",
                grant,
            });
        });
    }
    // ================== STATE ==================
    /** Retirar el permiso (borrado lógico). */
    async deactivate(req, res) {
        await this.run(res, async () => {
            const grant = await this.service.deactivate(this.paramId(req));
            res.status(200).json({
                message: "Grant deactivated (permission revoked)",
                grant,
            });
        });
    }
    /** Reactivar la concesión. */
    async reactivate(req, res) {
        await this.run(res, async () => {
            const grant = await this.service.reactivate(this.paramId(req));
            res.status(200).json({
                message: "Grant reactivated",
                grant,
            });
        });
    }
}
exports.ResourceRolesController = ResourceRolesController;
/** Convierte un `query param` en número o `undefined` (sin lanzar por basura). */
function toOptionalNumber(value) {
    const raw = Array.isArray(value) ? value[0] : value;
    if (typeof raw !== "string" || !/^\d+$/.test(raw)) {
        return undefined;
    }
    return Number(raw);
}
//# sourceMappingURL=resource-roles.controller.js.map