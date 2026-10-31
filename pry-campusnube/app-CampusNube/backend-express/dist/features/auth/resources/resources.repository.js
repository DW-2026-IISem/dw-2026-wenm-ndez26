"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesRepository = void 0;
const resource_model_1 = require("./resource.model");
const resource_match_1 = require("../../../shared/auth/resource-match");
/**
 * Capa Repository del feature Resources.
 * Única que habla con Sequelize (el modelo `Resource`).
 */
class ResourcesRepository {
    /** Todos los recursos activos. */
    async findAllActive() {
        return resource_model_1.Resource.findAll({ where: { status: "active" } });
    }
    /** Un recurso por PK (o `null`). */
    async findById(id, transaction) {
        return resource_model_1.Resource.findByPk(id, { transaction });
    }
    /** Un recurso por su par `(method, path)` (o `null`). */
    async findByOperation(method, path) {
        return resource_model_1.Resource.findOne({
            where: {
                method: method.trim().toUpperCase(),
                path: (0, resource_match_1.normalizePath)(path.trim()),
            },
        });
    }
    /** Inserta un recurso. */
    async create(data) {
        return resource_model_1.Resource.create(data);
    }
    /** Persiste cambios sobre una instancia existente. */
    async update(resource, data) {
        return resource.update(data);
    }
    /** Elimina físicamente una instancia. */
    async delete(resource) {
        await resource.destroy();
    }
}
exports.ResourcesRepository = ResourcesRepository;
//# sourceMappingURL=resources.repository.js.map