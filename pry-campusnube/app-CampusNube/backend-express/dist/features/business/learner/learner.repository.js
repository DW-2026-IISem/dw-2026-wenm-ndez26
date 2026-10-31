"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerRepository = void 0;
const learner_model_1 = require("./learner.model");
class LearnerRepository {
    async findAllActive() {
        return learner_model_1.Learner.findAll({
            where: {
                status: "active",
            },
        });
    }
    async findById(id, transaction, onlyActive = true) {
        return learner_model_1.Learner.findOne({
            where: {
                id,
                ...(onlyActive ? { status: "active" } : {}),
            },
            transaction,
        });
    }
    async create(data, transaction) {
        return learner_model_1.Learner.create(data, {
            transaction,
        });
    }
    async update(id, data, transaction) {
        const learner = await learner_model_1.Learner.findByPk(id, {
            transaction,
        });
        if (!learner) {
            return null;
        }
        await learner.update(data, {
            transaction,
        });
        return learner;
    }
    async delete(id, transaction) {
        return learner_model_1.Learner.destroy({
            where: {
                id,
            },
            transaction,
        });
    }
}
exports.LearnerRepository = LearnerRepository;
//# sourceMappingURL=learner.repository.js.map