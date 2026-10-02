import { AppError } from "../../../shared/errors/app-error";
import { CourseRepository } from "./course.repository";
import {
  CourseResponseDto,
  CreateCourseDto,
  PatchCourseDto,
  toCourseResponseDto,
  UpdateCourseDto,
} from "./dto";

export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository
  ) {}

  async getAll(): Promise<CourseResponseDto[]> {
    const courses = await this.courseRepository.findAllActive();

    return courses.map(toCourseResponseDto);
  }

  async getOne(id: number): Promise<CourseResponseDto> {
    const course = await this.findOrFail(id);

    return toCourseResponseDto(course);
  }

  async create(
    dto: CreateCourseDto
  ): Promise<CourseResponseDto> {
    const course = await this.courseRepository.create({
      name: dto.name,
      description: dto.description,
      isActive: dto.isActive ?? true,
    });

    return toCourseResponseDto(course);
  }

  async updatePut(
    id: number,
    dto: UpdateCourseDto
  ): Promise<CourseResponseDto> {
    await this.findOrFail(id);

    const course = await this.courseRepository.update(id, {
      name: dto.name,
      description: dto.description,
    });

    if (!course) {
      throw new AppError(404, "Course not found");
    }

    return toCourseResponseDto(course);
  }

  async updatePatch(
    id: number,
    dto: PatchCourseDto
  ): Promise<CourseResponseDto> {
    await this.findOrFail(id);

    const course = await this.courseRepository.update(id, {
      ...dto,
    });

    if (!course) {
      throw new AppError(404, "Course not found");
    }

    return toCourseResponseDto(course);
  }

  async deletePhysical(id: number): Promise<void> {
    await this.findOrFail(id, false);

    await this.courseRepository.delete(id);
  }

  async deleteLogical(
    id: number
  ): Promise<CourseResponseDto> {
    await this.findOrFail(id);

    const course = await this.courseRepository.update(id, {
      isActive: false,
    });

    if (!course) {
      throw new AppError(404, "Course not found");
    }

    return toCourseResponseDto(course);
  }

  private async findOrFail(
    id: number,
    onlyActive = true
  ) {
    const course = await this.courseRepository.findById(
      id,
      undefined,
      onlyActive
    );

    if (!course) {
      const message = onlyActive
        ? "Course not found or inactive"
        : "Course not found";

      throw new AppError(404, message);
    }

    return course;
  }
}
