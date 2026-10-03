import { AppError } from "../../../shared/errors/app-error";
import { EnrollmentRepository } from "./enrollment.repository";
import {
  CreateEnrollmentDto,
  EnrollmentResponseDto,
  PatchEnrollmentDto,
  toEnrollmentResponseDto,
  UpdateEnrollmentDto,
} from "./dto";

export class EnrollmentService {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository
  ) {}

  async getAll(): Promise<EnrollmentResponseDto[]> {
    const enrollments =
      await this.enrollmentRepository.findAllActive();

    return enrollments.map(toEnrollmentResponseDto);
  }

  async getOne(id: number): Promise<EnrollmentResponseDto> {
    const enrollment = await this.findOrFail(id);

    return toEnrollmentResponseDto(enrollment);
  }

  async create(
    dto: CreateEnrollmentDto
  ): Promise<EnrollmentResponseDto> {
    const enrollment = await this.enrollmentRepository.create({
      learner_id: dto.learner_id,
      course_id: dto.course_id,
      enrollment_date: dto.enrollment_date ?? new Date(),
      status: dto.status ?? "active",
    });

    return toEnrollmentResponseDto(enrollment);
  }

  async updatePut(
    id: number,
    dto: UpdateEnrollmentDto
  ): Promise<EnrollmentResponseDto> {
    await this.findOrFail(id);

    const enrollment =
      await this.enrollmentRepository.update(id, {
        learner_id: dto.learner_id,
        course_id: dto.course_id,
        enrollment_date: dto.enrollment_date,
      });

    if (!enrollment) {
      throw new AppError(404, "Enrollment not found");
    }

    return toEnrollmentResponseDto(enrollment);
  }

  async updatePatch(
    id: number,
    dto: PatchEnrollmentDto
  ): Promise<EnrollmentResponseDto> {
    await this.findOrFail(id);

    const enrollment =
      await this.enrollmentRepository.update(id, {
        ...dto,
      });

    if (!enrollment) {
      throw new AppError(404, "Enrollment not found");
    }

    return toEnrollmentResponseDto(enrollment);
  }

  async deletePhysical(id: number): Promise<void> {
    await this.findOrFail(id, false);

    await this.enrollmentRepository.delete(id);
  }

  async deleteLogical(
    id: number
  ): Promise<EnrollmentResponseDto> {
    await this.findOrFail(id);

    const enrollment =
      await this.enrollmentRepository.update(id, {
        status: "inactive",
      });

    if (!enrollment) {
      throw new AppError(404, "Enrollment not found");
    }

    return toEnrollmentResponseDto(enrollment);
  }

  private async findOrFail(
    id: number,
    onlyActive = true
  ) {
    const enrollment =
      await this.enrollmentRepository.findById(
        id,
        undefined,
        onlyActive
      );

    if (!enrollment) {
      const message = onlyActive
        ? "Enrollment not found or inactive"
        : "Enrollment not found";

      throw new AppError(404, message);
    }

    return enrollment;
  }
}
