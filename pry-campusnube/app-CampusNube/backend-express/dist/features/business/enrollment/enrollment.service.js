"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const dto_1 = require("./dto");
class EnrollmentService {
    constructor(enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }
    async getAll() {
        const enrollments = await this.enrollmentRepository.findAllActive();
        return enrollments.map(dto_1.toEnrollmentResponseDto);
    }
    async getOne(id) {
        const enrollment = await this.findOrFail(id);
        return (0, dto_1.toEnrollmentResponseDto)(enrollment);
    }
    async create(dto) {
        const enrollment = await this.enrollmentRepository.create({
            learner_id: dto.learner_id,
            course_id: dto.course_id,
            enrollment_date: dto.enrollment_date ?? new Date(),
            status: dto.status ?? "active",
        });
        return (0, dto_1.toEnrollmentResponseDto)(enrollment);
    }
    async updatePut(id, dto) {
        await this.findOrFail(id);
        const enrollment = await this.enrollmentRepository.update(id, {
            learner_id: dto.learner_id,
            course_id: dto.course_id,
            enrollment_date: dto.enrollment_date,
        });
        if (!enrollment) {
            throw new app_error_1.AppError(404, "Enrollment not found");
        }
        return (0, dto_1.toEnrollmentResponseDto)(enrollment);
    }
    async updatePatch(id, dto) {
        await this.findOrFail(id);
        const enrollment = await this.enrollmentRepository.update(id, {
            ...dto,
        });
        if (!enrollment) {
            throw new app_error_1.AppError(404, "Enrollment not found");
        }
        return (0, dto_1.toEnrollmentResponseDto)(enrollment);
    }
    async deletePhysical(id) {
        await this.findOrFail(id, false);
        await this.enrollmentRepository.delete(id);
    }
    async deleteLogical(id) {
        await this.findOrFail(id);
        const enrollment = await this.enrollmentRepository.update(id, {
            status: "inactive",
        });
        if (!enrollment) {
            throw new app_error_1.AppError(404, "Enrollment not found");
        }
        return (0, dto_1.toEnrollmentResponseDto)(enrollment);
    }
    async findOrFail(id, onlyActive = true) {
        const enrollment = await this.enrollmentRepository.findById(id, undefined, onlyActive);
        if (!enrollment) {
            const message = onlyActive
                ? "Enrollment not found or inactive"
                : "Enrollment not found";
            throw new app_error_1.AppError(404, message);
        }
        return enrollment;
    }
}
exports.EnrollmentService = EnrollmentService;
//# sourceMappingURL=enrollment.service.js.map