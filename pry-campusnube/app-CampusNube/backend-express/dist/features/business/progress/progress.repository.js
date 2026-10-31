"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRepository = void 0;
const enrollment_model_1 = require("../enrollment/enrollment.model");
const progress_model_1 = require("./progress.model");
/**
 * Repository de Progress.
 *
 * Única capa responsable de acceder a Sequelize.
 */
class ProgressRepository {
    // ================== READ ==================
    async findAll() {
        return progress_model_1.Progress.findAll({
            where: {
                isActive: true,
            },
        });
    }
    async findById(id) {
        return progress_model_1.Progress.findOne({
            where: {
                id,
                isActive: true,
            },
        });
    }
    // ================== VALIDACIONES ==================
    async findActiveEnrollment(enrollmentId) {
        return enrollment_model_1.Enrollment.findOne({
            where: {
                id: enrollmentId,
                status: "active",
            },
        });
    }
    // ================== CREATE ==================
    async create(data) {
        return progress_model_1.Progress.create({
            enrollment_id: data.enrollment_id,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true,
        });
    }
    // ================== UPDATE ==================
    async update(progress, data) {
        await progress.update({
            enrollment_id: data.enrollment_id,
            name: data.name,
            description: data.description ?? null,
        });
        return progress;
    }
    async patch(progress, data) {
        await progress.update({
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
        return progress;
    }
    // ================== DELETE ==================
    async delete(progress) {
        await progress.destroy();
    }
    async deactivate(progress) {
        await progress.update({
            isActive: false,
        });
        return progress;
    }
}
exports.ProgressRepository = ProgressRepository;
//# sourceMappingURL=progress.repository.js.map