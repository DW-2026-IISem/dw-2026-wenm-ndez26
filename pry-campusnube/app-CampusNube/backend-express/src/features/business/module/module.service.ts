import { AppError } from "../../../shared/errors/app-error";
import { Course } from "../course/course.model";
import { ModuleRepository } from "./module.repository";
import {
  CreateModuleDto,
  ModuleResponseDto,
  PatchModuleDto,
  toModuleResponseDto,
  UpdateModuleDto,
} from "./dto";

export class ModuleService {
  constructor(
    private readonly moduleRepository: ModuleRepository
  ) {}

  async getAll(): Promise<ModuleResponseDto[]> {
    const modules =
      await this.moduleRepository.findAllActive();

    return modules.map(toModuleResponseDto);
  }

  async getOne(id: number): Promise<ModuleResponseDto> {
    const module = await this.findOrFail(id);

    return toModuleResponseDto(module);
  }

  async create(
    dto: CreateModuleDto
  ): Promise<ModuleResponseDto> {
    await this.validateActiveCourse(dto.course_id);

    const module = await this.moduleRepository.create({
      course_id: dto.course_id,
      name: dto.name,
      description: dto.description ?? null,
      isActive: dto.isActive ?? true,
    });

    return toModuleResponseDto(module);
  }

  async updatePut(
    id: number,
    dto: UpdateModuleDto
  ): Promise<ModuleResponseDto> {
    await this.findOrFail(id);
    await this.validateActiveCourse(dto.course_id);

    const module = await this.moduleRepository.update(id, {
      course_id: dto.course_id,
      name: dto.name,
      description: dto.description ?? null,
    });

    if (!module) {
      throw new AppError(404, "Module not found");
    }

    return toModuleResponseDto(module);
  }

  async updatePatch(
    id: number,
    dto: PatchModuleDto
  ): Promise<ModuleResponseDto> {
    await this.findOrFail(id);

    if (dto.course_id !== undefined) {
      await this.validateActiveCourse(dto.course_id);
    }

    const module = await this.moduleRepository.update(id, {
      ...dto,
    });

    if (!module) {
      throw new AppError(404, "Module not found");
    }

    return toModuleResponseDto(module);
  }

  async deletePhysical(id: number): Promise<void> {
    await this.findOrFail(id, false);

    await this.moduleRepository.delete(id);
  }

  async deleteLogical(
    id: number
  ): Promise<ModuleResponseDto> {
    await this.findOrFail(id);

    const module = await this.moduleRepository.update(id, {
      isActive: false,
    });

    if (!module) {
      throw new AppError(404, "Module not found");
    }

    return toModuleResponseDto(module);
  }

  private async findOrFail(
    id: number,
    onlyActive = true
  ) {
    const module = await this.moduleRepository.findById(
      id,
      undefined,
      onlyActive
    );

    if (!module) {
      const message = onlyActive
        ? "Module not found or inactive"
        : "Module not found";

      throw new AppError(404, message);
    }

    return module;
  }

  private async validateActiveCourse(
    courseId: number
  ): Promise<void> {
    const course = await Course.findOne({
      where: {
        id: Number(courseId),
        isActive: true,
      },
    });

    if (!course) {
      throw new AppError(
        400,
        "El curso no existe o no está activo"
      );
    }
  }
}
