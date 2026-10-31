"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const attempt_repository_1 = require("./attempt.repository");
const dto_1 = require("./dto");
class AttemptService {
    constructor() {
        this.repository = new attempt_repository_1.AttemptRepository();
    }
    async getAll() {
        const attempts = await this.repository.findAll();
        return attempts.map(dto_1.toAttemptResponseDto);
    }
    async findOrFail(id) {
        const attempt = await this.repository.findById(id);
        if (!attempt) {
            throw new app_error_1.AppError(404, "Intento no encontrado");
        }
        return attempt;
    }
    async validateActiveEnrollment(enrollmentId) {
        const enrollment = await this.repository.findActiveEnrollment(enrollmentId);
        if (!enrollment) {
            throw new app_error_1.AppError(400, "La inscripción no existe o no está activa");
        }
    }
    async getOne(id) {
        const attempt = await this.findOrFail(id);
        return (0, dto_1.toAttemptResponseDto)(attempt);
    }
    async create(data) {
        await this.validateActiveEnrollment(data.enrollment_id);
        const attempt = await this.repository.create(data);
        return (0, dto_1.toAttemptResponseDto)(attempt);
    }
    async update(id, data) {
        const attempt = await this.findOrFail(id);
        await this.validateActiveEnrollment(data.enrollment_id);
        const updatedAttempt = await this.repository.update(attempt, data);
        return (0, dto_1.toAttemptResponseDto)(updatedAttempt);
    }
    async patch(id, data) {
        const attempt = await this.findOrFail(id);
        if (data.enrollment_id !== undefined) {
            await this.validateActiveEnrollment(data.enrollment_id);
        }
        const updatedAttempt = await this.repository.patch(attempt, data);
        return (0, dto_1.toAttemptResponseDto)(updatedAttempt);
    }
    async delete(id) {
        const attempt = await this.findOrFail(id);
        await this.repository.delete(attempt);
    }
    async deactivate(id) {
        const attempt = await this.findOrFail(id);
        const deactivatedAttempt = await this.repository.deactivate(attempt);
        return (0, dto_1.toAttemptResponseDto)(deactivatedAttempt);
    }
}
exports.AttemptService = AttemptService;
//# sourceMappingURL=attempt.service.js.map