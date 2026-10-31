"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const dto_1 = require("./dto");
class LearnerService {
    constructor(learnerRepository) {
        this.learnerRepository = learnerRepository;
    }
    async getAll() {
        const learners = await this.learnerRepository.findAllActive();
        return learners.map(dto_1.toLearnerResponseDto);
    }
    async getOne(id) {
        const learner = await this.findOrFail(id);
        return (0, dto_1.toLearnerResponseDto)(learner);
    }
    async create(dto) {
        const learner = await this.learnerRepository.create({
            name: dto.name,
            description: dto.description,
            password: dto.password,
            status: dto.status ?? "active",
        });
        return (0, dto_1.toLearnerResponseDto)(learner);
    }
    async updatePut(id, dto) {
        await this.findOrFail(id);
        const learner = await this.learnerRepository.update(id, {
            name: dto.name,
            description: dto.description,
            password: dto.password,
        });
        if (!learner) {
            throw new app_error_1.AppError(404, "Learner not found");
        }
        return (0, dto_1.toLearnerResponseDto)(learner);
    }
    async updatePatch(id, dto) {
        await this.findOrFail(id);
        const learner = await this.learnerRepository.update(id, {
            ...dto,
        });
        if (!learner) {
            throw new app_error_1.AppError(404, "Learner not found");
        }
        return (0, dto_1.toLearnerResponseDto)(learner);
    }
    async deletePhysical(id) {
        await this.findOrFail(id, false);
        await this.learnerRepository.delete(id);
    }
    async deleteLogical(id) {
        const learner = await this.findOrFail(id);
        const updated = await this.learnerRepository.update(id, {
            status: "inactive",
        });
        if (!updated) {
            throw new app_error_1.AppError(404, "Learner not found");
        }
        return (0, dto_1.toLearnerResponseDto)(updated);
    }
    async findOrFail(id, onlyActive = true) {
        const learner = await this.learnerRepository.findById(id, undefined, onlyActive);
        if (!learner) {
            const message = onlyActive
                ? "Learner not found or inactive"
                : "Learner not found";
            throw new app_error_1.AppError(404, message);
        }
        return learner;
    }
}
exports.LearnerService = LearnerService;
//# sourceMappingURL=learner.service.js.map