"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRepository = void 0;
const module_model_1 = require("./module.model");
class ModuleRepository {
    async findAllActive() {
        return module_model_1.Module.findAll({
            where: { isActive: true },
            order: [["id", "ASC"]],
        });
    }
    async findById(id, transaction, onlyActive = true) {
        return module_model_1.Module.findOne({
            where: {
                id,
                ...(onlyActive ? { isActive: true } : {}),
            },
            transaction,
        });
    }
    async create(data, transaction) {
        return module_model_1.Module.create(data, { transaction });
    }
    async update(id, data, transaction) {
        const module = await module_model_1.Module.findByPk(id, {
            transaction,
        });
        if (!module) {
            return null;
        }
        await module.update(data, { transaction });
        return module;
    }
    async delete(id, transaction) {
        return module_model_1.Module.destroy({
            where: { id },
            transaction,
        });
    }
}
exports.ModuleRepository = ModuleRepository;
//# sourceMappingURL=module.repository.js.map