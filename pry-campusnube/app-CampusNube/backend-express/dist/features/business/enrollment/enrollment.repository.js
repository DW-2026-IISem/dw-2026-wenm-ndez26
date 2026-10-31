"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRepository = void 0;
const enrollment_model_1 = require("./enrollment.model");
class EnrollmentRepository {
    async findAllActive() {
        return enrollment_model_1.Enrollment.findAll({
            where: { status: "active" },
            order: [["id", "ASC"]],
        });
    }
    async findById(id, transaction, onlyActive = true) {
        return enrollment_model_1.Enrollment.findOne({
            where: {
                id,
                ...(onlyActive ? { status: "active" } : {}),
            },
            transaction,
        });
    }
    async create(data, transaction) {
        return enrollment_model_1.Enrollment.create(data, { transaction });
    }
    async update(id, data, transaction) {
        const enrollment = await enrollment_model_1.Enrollment.findByPk(id, { transaction });
        if (!enrollment) {
            return null;
        }
        await enrollment.update(data, { transaction });
        return enrollment;
    }
    async delete(id, transaction) {
        return enrollment_model_1.Enrollment.destroy({
            where: { id },
            transaction,
        });
    }
}
exports.EnrollmentRepository = EnrollmentRepository;
//# sourceMappingURL=enrollment.repository.js.map