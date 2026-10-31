"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationRepository = void 0;
const evaluation_model_1 = require("./evaluation.model");
class EvaluationRepository {
    async findAllActive() {
        return evaluation_model_1.Evaluation.findAll({
            where: { isActive: true },
            order: [["id", "ASC"]],
        });
    }
    async findById(id, transaction, onlyActive = true) {
        return evaluation_model_1.Evaluation.findOne({
            where: {
                id,
                ...(onlyActive ? { isActive: true } : {}),
            },
            transaction,
        });
    }
    async create(data, transaction) {
        return evaluation_model_1.Evaluation.create(data, { transaction });
    }
    async update(id, data, transaction) {
        const evaluation = await evaluation_model_1.Evaluation.findByPk(id, {
            transaction,
        });
        if (!evaluation) {
            return null;
        }
        await evaluation.update(data, { transaction });
        return evaluation;
    }
    async delete(id, transaction) {
        return evaluation_model_1.Evaluation.destroy({
            where: { id },
            transaction,
        });
    }
}
exports.EvaluationRepository = EvaluationRepository;
//# sourceMappingURL=evaluation.repository.js.map