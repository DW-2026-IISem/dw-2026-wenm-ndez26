"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const dto_1 = require("./dto");
class TeacherService {
    constructor(teacherRepository) {
        this.teacherRepository = teacherRepository;
    }
    async getAll() {
        const teachers = await this.teacherRepository.findAllActive();
        return teachers.map(dto_1.toTeacherResponseDto);
    }
    async getOne(id) {
        const teacher = await this.findOrFail(id);
        return (0, dto_1.toTeacherResponseDto)(teacher);
    }
    async create(dto) {
        const teacher = await this.teacherRepository.create({
            name: dto.name,
            description: dto.description,
            isActive: dto.isActive ?? true,
        });
        return (0, dto_1.toTeacherResponseDto)(teacher);
    }
    async updatePut(id, dto) {
        await this.findOrFail(id);
        const teacher = await this.teacherRepository.update(id, {
            name: dto.name,
            description: dto.description,
        });
        if (!teacher) {
            throw new app_error_1.AppError(404, "Teacher not found");
        }
        return (0, dto_1.toTeacherResponseDto)(teacher);
    }
    async updatePatch(id, dto) {
        await this.findOrFail(id);
        const teacher = await this.teacherRepository.update(id, {
            ...dto,
        });
        if (!teacher) {
            throw new app_error_1.AppError(404, "Teacher not found");
        }
        return (0, dto_1.toTeacherResponseDto)(teacher);
    }
    async deletePhysical(id) {
        await this.findOrFail(id, false);
        await this.teacherRepository.delete(id);
    }
    async deleteLogical(id) {
        await this.findOrFail(id);
        const teacher = await this.teacherRepository.update(id, {
            isActive: false,
        });
        if (!teacher) {
            throw new app_error_1.AppError(404, "Teacher not found");
        }
        return (0, dto_1.toTeacherResponseDto)(teacher);
    }
    async findOrFail(id, onlyActive = true) {
        const teacher = await this.teacherRepository.findById(id, undefined, onlyActive);
        if (!teacher) {
            const message = onlyActive
                ? "Teacher not found or inactive"
                : "Teacher not found";
            throw new app_error_1.AppError(404, message);
        }
        return teacher;
    }
}
exports.TeacherService = TeacherService;
//# sourceMappingURL=teacher.service.js.map