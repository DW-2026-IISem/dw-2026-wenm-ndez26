"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const course_model_1 = require("../course/course.model");
const dto_1 = require("./dto");
class ModuleService {
    constructor(moduleRepository) {
        this.moduleRepository = moduleRepository;
    }
    async getAll() {
        const modules = await this.moduleRepository.findAllActive();
        return modules.map(dto_1.toModuleResponseDto);
    }
    async getOne(id) {
        const module = await this.findOrFail(id);
        return (0, dto_1.toModuleResponseDto)(module);
    }
    async create(dto) {
        await this.validateActiveCourse(dto.course_id);
        const module = await this.moduleRepository.create({
            course_id: dto.course_id,
            name: dto.name,
            description: dto.description ?? null,
            isActive: dto.isActive ?? true,
        });
        return (0, dto_1.toModuleResponseDto)(module);
    }
    async updatePut(id, dto) {
        await this.findOrFail(id);
        await this.validateActiveCourse(dto.course_id);
        const module = await this.moduleRepository.update(id, {
            course_id: dto.course_id,
            name: dto.name,
            description: dto.description ?? null,
        });
        if (!module) {
            throw new app_error_1.AppError(404, "Module not found");
        }
        return (0, dto_1.toModuleResponseDto)(module);
    }
    async updatePatch(id, dto) {
        await this.findOrFail(id);
        if (dto.course_id !== undefined) {
            await this.validateActiveCourse(dto.course_id);
        }
        const module = await this.moduleRepository.update(id, {
            ...dto,
        });
        if (!module) {
            throw new app_error_1.AppError(404, "Module not found");
        }
        return (0, dto_1.toModuleResponseDto)(module);
    }
    async deletePhysical(id) {
        await this.findOrFail(id, false);
        await this.moduleRepository.delete(id);
    }
    async deleteLogical(id) {
        await this.findOrFail(id);
        const module = await this.moduleRepository.update(id, {
            isActive: false,
        });
        if (!module) {
            throw new app_error_1.AppError(404, "Module not found");
        }
        return (0, dto_1.toModuleResponseDto)(module);
    }
    async findOrFail(id, onlyActive = true) {
        const module = await this.moduleRepository.findById(id, undefined, onlyActive);
        if (!module) {
            const message = onlyActive
                ? "Module not found or inactive"
                : "Module not found";
            throw new app_error_1.AppError(404, message);
        }
        return module;
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
exports.ModuleService = ModuleService;
//# sourceMappingURL=module.service.js.map