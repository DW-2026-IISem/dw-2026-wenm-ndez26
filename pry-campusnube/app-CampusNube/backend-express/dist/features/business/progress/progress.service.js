"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const progress_repository_1 = require("./progress.repository");
const dto_1 = require("./dto");
/**
 * Service de Progress.
 *
 * Contiene las reglas de negocio.
 * No conoce req/res ni accede directamente a Sequelize.
 */
class ProgressService {
    constructor(repository = new progress_repository_1.ProgressRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const progress = await this.repository.findAll();
        return progress.map(dto_1.toProgressResponse);
    }
    async findOrFail(id) {
        const progress = await this.repository.findById(id);
        if (!progress) {
            throw new app_error_1.AppError(404, "Progreso no encontrado");
        }
        return progress;
    }
    async getOne(id) {
        const progress = await this.findOrFail(id);
        return (0, dto_1.toProgressResponse)(progress);
    }
    // ================== CREATE ==================
    async validateActiveEnrollment(enrollmentId) {
        const enrollment = await this.repository.findActiveEnrollment(enrollmentId);
        if (!enrollment) {
            throw new app_error_1.AppError(400, "La inscripción no existe o no está activa");
        }
    }
    async create(body) {
        await this.validateActiveEnrollment(body.enrollment_id);
        const progress = await this.repository.create(body);
        return (0, dto_1.toProgressResponse)(progress);
    }
    // ================== UPDATE ==================
    async update(id, body) {
        const progress = await this.findOrFail(id);
        await this.validateActiveEnrollment(body.enrollment_id);
        const updated = await this.repository.update(progress, body);
        return (0, dto_1.toProgressResponse)(updated);
    }
    async patch(id, body) {
        const progress = await this.findOrFail(id);
        if (body.enrollment_id !== undefined) {
            await this.validateActiveEnrollment(body.enrollment_id);
        }
        const updated = await this.repository.patch(progress, body);
        return (0, dto_1.toProgressResponse)(updated);
    }
    // ================== DELETE ==================
    async delete(id) {
        const progress = await this.findOrFail(id);
        await this.repository.delete(progress);
    }
    async deactivate(id) {
        const progress = await this.findOrFail(id);
        const updated = await this.repository.deactivate(progress);
        return (0, dto_1.toProgressResponse)(updated);
    }
}
exports.ProgressService = ProgressService;
//# sourceMappingURL=progress.service.js.map