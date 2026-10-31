"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const dto_1 = require("./dto");
class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async getAll() {
        const courses = await this.courseRepository.findAllActive();
        return courses.map(dto_1.toCourseResponseDto);
    }
    async getOne(id) {
        const course = await this.findOrFail(id);
        return (0, dto_1.toCourseResponseDto)(course);
    }
    async create(dto) {
        const course = await this.courseRepository.create({
            name: dto.name,
            description: dto.description,
            isActive: dto.isActive ?? true,
        });
        return (0, dto_1.toCourseResponseDto)(course);
    }
    async updatePut(id, dto) {
        await this.findOrFail(id);
        const course = await this.courseRepository.update(id, {
            name: dto.name,
            description: dto.description,
        });
        if (!course) {
            throw new app_error_1.AppError(404, "Course not found");
        }
        return (0, dto_1.toCourseResponseDto)(course);
    }
    async updatePatch(id, dto) {
        await this.findOrFail(id);
        const course = await this.courseRepository.update(id, {
            ...dto,
        });
        if (!course) {
            throw new app_error_1.AppError(404, "Course not found");
        }
        return (0, dto_1.toCourseResponseDto)(course);
    }
    async deletePhysical(id) {
        await this.findOrFail(id, false);
        await this.courseRepository.delete(id);
    }
    async deleteLogical(id) {
        await this.findOrFail(id);
        const course = await this.courseRepository.update(id, {
            isActive: false,
        });
        if (!course) {
            throw new app_error_1.AppError(404, "Course not found");
        }
        return (0, dto_1.toCourseResponseDto)(course);
    }
    async findOrFail(id, onlyActive = true) {
        const course = await this.courseRepository.findById(id, undefined, onlyActive);
        if (!course) {
            const message = onlyActive
                ? "Course not found or inactive"
                : "Course not found";
            throw new app_error_1.AppError(404, message);
        }
        return course;
    }
}
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map