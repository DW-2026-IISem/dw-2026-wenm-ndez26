import { AppError } from "../../../shared/errors/app-error";
import { TeacherRepository } from "./teacher.repository";
import {
  CreateTeacherDto,
  PatchTeacherDto,
  TeacherResponseDto,
  toTeacherResponseDto,
  UpdateTeacherDto,
} from "./dto";

export class TeacherService {
  constructor(
    private readonly teacherRepository: TeacherRepository
  ) {}

  async getAll(): Promise<TeacherResponseDto[]> {
    const teachers = await this.teacherRepository.findAllActive();

    return teachers.map(toTeacherResponseDto);
  }

  async getOne(id: number): Promise<TeacherResponseDto> {
    const teacher = await this.findOrFail(id);

    return toTeacherResponseDto(teacher);
  }

  async create(
    dto: CreateTeacherDto
  ): Promise<TeacherResponseDto> {
    const teacher = await this.teacherRepository.create({
      name: dto.name,
      description: dto.description,
      isActive: dto.isActive ?? true,
    });

    return toTeacherResponseDto(teacher);
  }

  async updatePut(
    id: number,
    dto: UpdateTeacherDto
  ): Promise<TeacherResponseDto> {
    await this.findOrFail(id);

    const teacher = await this.teacherRepository.update(id, {
      name: dto.name,
      description: dto.description,
    });

    if (!teacher) {
      throw new AppError(404, "Teacher not found");
    }

    return toTeacherResponseDto(teacher);
  }

  async updatePatch(
    id: number,
    dto: PatchTeacherDto
  ): Promise<TeacherResponseDto> {
    await this.findOrFail(id);

    const teacher = await this.teacherRepository.update(id, {
      ...dto,
    });

    if (!teacher) {
      throw new AppError(404, "Teacher not found");
    }

    return toTeacherResponseDto(teacher);
  }

  async deletePhysical(id: number): Promise<void> {
    await this.findOrFail(id, false);

    await this.teacherRepository.delete(id);
  }

  async deleteLogical(
    id: number
  ): Promise<TeacherResponseDto> {
    await this.findOrFail(id);

    const teacher = await this.teacherRepository.update(id, {
      isActive: false,
    });

    if (!teacher) {
      throw new AppError(404, "Teacher not found");
    }

    return toTeacherResponseDto(teacher);
  }

  private async findOrFail(
    id: number,
    onlyActive = true
  ) {
    const teacher = await this.teacherRepository.findById(
      id,
      undefined,
      onlyActive
    );

    if (!teacher) {
      const message = onlyActive
        ? "Teacher not found or inactive"
        : "Teacher not found";

      throw new AppError(404, message);
    }

    return teacher;
  }
}
