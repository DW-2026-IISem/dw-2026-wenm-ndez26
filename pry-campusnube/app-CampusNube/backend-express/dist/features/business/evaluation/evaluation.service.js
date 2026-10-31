"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const course_model_1 = require("../course/course.model");
const dto_1 = require("./dto");
class EvaluationService {
    constructor(evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }
    async getAll() {
        const evaluations = await this.evaluationRepository.findAllActive();
        return evaluations.map(dto_1.toEvaluationResponseDto);
    }
    async getOne(id) {
        const evaluation = await this.findOrFail(id);
        return (0, dto_1.toEvaluationResponseDto)(evaluation);
    }
    async create(dto) {
        await this.validateActiveCourse(dto.course_id);
        const evaluation = await this.evaluationRepository.create({
            course_id: dto.course_id,
            name: dto.name,
            description: dto.description ?? null,
            isActive: dto.isActive ?? true,
        });
        return (0, dto_1.toEvaluationResponseDto)(evaluation);
    }
    async updatePut(id, dto) {
        await this.findOrFail(id);
        await this.validateActiveCourse(dto.course_id);
        const evaluation = await this.evaluationRepository.update(id, {
            course_id: dto.course_id,
            name: dto.name,
            description: dto.description ?? null,
        });
        if (!evaluation) {
            throw new app_error_1.AppError(404, "Evaluation not found");
        }
        return (0, dto_1.toEvaluationResponseDto)(evaluation);
    }
    async updatePatch(id, dto) {
        await this.findOrFail(id);
        if (dto.course_id !== undefined) {
            await this.validateActiveCourse(dto.course_id);
        }
        const evaluation = await this.evaluationRepository.update(id, {
            ...dto,
        });
        if (!evaluation) {
            throw new app_error_1.AppError(404, "Evaluation not found");
        }
        return (0, dto_1.toEvaluationResponseDto)(evaluation);
    }
    async deletePhysical(id) {
        await this.findOrFail(id, false);
        await this.evaluationRepository.delete(id);
    }
    async deleteLogical(id) {
        await this.findOrFail(id);
        const evaluation = await this.evaluationRepository.update(id, {
            isActive: false,
        });
        if (!evaluation) {
            throw new app_error_1.AppError(404, "Evaluation not found");
        }
        return (0, dto_1.toEvaluationResponseDto)(evaluation);
    }
    async findOrFail(id, onlyActive = true) {
        const evaluation = await this.evaluationRepository.findById(id, undefined, onlyActive);
        if (!evaluation) {
            const message = onlyActive
                ? "Evaluation not found or inactive"
                : "Evaluation not found";
            throw new app_error_1.AppError(404, message);
        }
        return evaluation;
    }
    async validateActiveCourse(courseId) {
        const course = await course_model_1.Course.findOne({
            where: {
                id: Number(courseId),
                isActive: true,
            },
        });
        if (!course) {
            throw new app_error_1.AppError(400, "El curso no existe o no está activo");
        }
    }
}
exports.EvaluationService = EvaluationService;
//# sourceMappingURL=evaluation.service.js.map