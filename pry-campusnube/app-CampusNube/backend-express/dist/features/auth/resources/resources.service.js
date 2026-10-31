"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const dto_1 = require("./dto");
const resources_repository_1 = require("./resources.repository");
const app_error_1 = require("../../../shared/errors/app-error");
/**
 * Capa Service del feature Resources.
 *
 * Reglas de negocio: la tupla `(method, path)` es única. Se comprueba antes de
 * escribir para responder 409 con un mensaje útil en lugar de dejar reventar la
 * restricción única de la base de datos como 500.
 */
class ResourcesService {
    constructor(repository = new resources_repository_1.ResourcesRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const resources = await this.repository.findAllActive();
        return resources.map((resource) => (0, dto_1.toResourceResponse)(resource));
    }
    async getOne(id) {
        return (0, dto_1.toResourceResponse)(await this.findOrFail(id));
    }
    // ================== CREATE ==================
    async create(body) {
        if (!body.method || !body.path) {
            throw new app_error_1.AppError(400, "method and path are required");
        }
        await this.assertOperationAvailable(body.method, body.path);
        const resource = await this.repository.create({
            method: body.method,
            path: body.path,
            description: body.description ?? null,
            status: body.status ?? "active",
        });
        return (0, dto_1.toResourceResponse)(resource);
    }
    // ================== UPDATE ==================
    async updatePut(id, body) {
        const resource = await this.findOrFail(id);
        await this.assertOperationAvailable(body.method, body.path, id);
        await this.repository.update(resource, {
            method: body.method,
            path: body.path,
            description: body.description ?? null,
        });
        return (0, dto_1.toResourceResponse)(resource);
    }
    async updatePatch(id, body) {
        const resource = await this.findOrFail(id);
        const method = body.method ?? resource.method;
        const path = body.path ?? resource.path;
        await this.assertOperationAvailable(method, path, id);
        await this.repository.update(resource, body);
        return (0, dto_1.toResourceResponse)(resource);
    }
    // ================== DELETE ==================
    /** Eliminación física. */
    async deletePhysical(id) {
        const resource = await this.findOrFail(id, false);
        await this.repository.delete(resource);
    }
    /** Eliminación lógica -> `status = inactive`. Deshabilita el punto de acceso. */
    async deleteLogical(id) {
        const resource = await this.findOrFail(id);
        await this.repository.update(resource, {
            status: "inactive",
        });
        return (0, dto_1.toResourceResponse)(resource);
    }
    // ================== HELPERS ==================
    async findOrFail(id, onlyActive = true) {
        const resource = await this.repository.findById(id);
        if (!resource || (onlyActive && resource.status !== "active")) {
            throw new app_error_1.AppError(404, "Resource not found");
        }
        return resource;
    }
    /** 409 si otro recurso ya declara el mismo `(method, path)`. */
    async assertOperationAvailable(method, path, excludeId) {
        const existing = await this.repository.findByOperation(method, path);
        if (existing && existing.id !== excludeId) {
            throw new app_error_1.AppError(409, `Resource ${method.toUpperCase()} ${path} already exists`);
        }
    }
}
exports.ResourcesService = ResourcesService;
//# sourceMappingURL=resources.service.js.map