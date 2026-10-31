"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const submission_repository_1 = require("./submission.repository");
const dto_1 = require("./dto");
/**
 * Service de Submission.
 *
 * Contiene las reglas de negocio.
 * No conoce req/res ni accede directamente a Sequelize.
 */
class SubmissionService {
    constructor(repository = new submission_repository_1.SubmissionRepository()) {
        this.repository = repository;
    }
    // ================== READ ==================
    async getAll() {
        const submissions = await this.repository.findAll();
        return submissions.map(dto_1.toSubmissionResponse);
    }
    async findOrFail(id) {
        const submission = await this.repository.findById(id);
        if (!submission) {
            throw new app_error_1.AppError(404, "Entrega no encontrada");
        }
        return submission;
    }
    async getOne(id) {
        const submission = await this.findOrFail(id);
        return (0, dto_1.toSubmissionResponse)(submission);
    }
    // ================== CREATE ==================
    async validateActiveLesson(lessonId) {
        const lesson = await this.repository.findActiveLesson(lessonId);
        if (!lesson) {
            throw new app_error_1.AppError(400, "La lección no existe o no está activa");
        }
    }
    async validateActiveEnrollment(enrollmentId) {
        const enrollment = await this.repository.findActiveEnrollment(enrollmentId);
        if (!enrollment) {
            throw new app_error_1.AppError(400, "La inscripción no existe o no está activa");
        }
    }
    async create(body) {
        await this.validateActiveLesson(body.lesson_id);
        await this.validateActiveEnrollment(body.enrollment_id);
        const submission = await this.repository.create(body);
        return (0, dto_1.toSubmissionResponse)(submission);
    }
    // ================== UPDATE ==================
    async update(id, body) {
        const submission = await this.findOrFail(id);
        await this.validateActiveLesson(body.lesson_id);
        await this.validateActiveEnrollment(body.enrollment_id);
        const updated = await this.repository.update(submission, body);
        return (0, dto_1.toSubmissionResponse)(updated);
    }
    async patch(id, body) {
        const submission = await this.findOrFail(id);
        if (body.lesson_id !== undefined) {
            await this.validateActiveLesson(body.lesson_id);
        }
        if (body.enrollment_id !== undefined) {
            await this.validateActiveEnrollment(body.enrollment_id);
        }
        const updated = await this.repository.patch(submission, body);
        return (0, dto_1.toSubmissionResponse)(updated);
    }
    // ================== DELETE ==================
    async delete(id) {
        const submission = await this.findOrFail(id);
        await this.repository.delete(submission);
    }
    async deactivate(id) {
        const submission = await this.findOrFail(id);
        const updated = await this.repository.deactivate(submission);
        return (0, dto_1.toSubmissionResponse)(updated);
    }
}
exports.SubmissionService = SubmissionService;
//# sourceMappingURL=submission.service.js.map