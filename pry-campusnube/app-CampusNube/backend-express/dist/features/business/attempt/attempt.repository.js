"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptRepository = void 0;
const enrollment_model_1 = require("../enrollment/enrollment.model");
const attempt_model_1 = require("./attempt.model");
class AttemptRepository {
    async findAll() {
        return attempt_model_1.Attempt.findAll({
            where: {
                isActive: true,
            },
        });
    }
    async findById(id) {
        return attempt_model_1.Attempt.findOne({
            where: {
                id,
                isActive: true,
            },
        });
    }
    async findActiveEnrollment(enrollmentId) {
        return enrollment_model_1.Enrollment.findOne({
            where: {
                id: enrollmentId,
                status: "active",
            },
        });
    }
    async create(data) {
        return attempt_model_1.Attempt.create({
            enrollment_id: data.enrollment_id,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true,
        });
    }
    async update(attempt, data) {
        await attempt.update({
            enrollment_id: data.enrollment_id,
            name: data.name,
            description: data.description ?? null,
        });
        return attempt;
    }
    async patch(attempt, data) {
        await attempt.update({
            ...(data.enrollment_id !== undefined && {
                enrollment_id: data.enrollment_id,
            }),
            ...(data.name !== undefined && {
                name: data.name,
            }),
            ...(data.description !== undefined && {
                description: data.description,
            }),
        });
        return attempt;
    }
    async delete(attempt) {
        await attempt.destroy();
    }
    async deactivate(attempt) {
        await attempt.update({
            isActive: false,
        });
        return attempt;
    }
}
exports.AttemptRepository = AttemptRepository;
//# sourceMappingURL=attempt.repository.js.map