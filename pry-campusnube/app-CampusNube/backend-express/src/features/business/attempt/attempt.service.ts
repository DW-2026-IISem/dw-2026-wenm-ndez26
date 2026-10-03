import { AppError } from "../../../shared/errors/app-error";
import { Attempt } from "./attempt.model";
import { AttemptRepository } from "./attempt.repository";
import {
  AttemptResponseDto,
  CreateAttemptDto,
  PatchAttemptDto,
  UpdateAttemptDto,
  toAttemptResponseDto,
} from "./dto";

export class AttemptService {
  private readonly repository = new AttemptRepository();

  async getAll(): Promise<AttemptResponseDto[]> {
    const attempts = await this.repository.findAll();

    return attempts.map(toAttemptResponseDto);
  }

  async findOrFail(id: number): Promise<Attempt> {
    const attempt = await this.repository.findById(id);

    if (!attempt) {
      throw new AppError(404, "Intento no encontrado");
    }

    return attempt;
  }

  private async validateActiveEnrollment(
    enrollmentId: number
  ): Promise<void> {
    const enrollment =
      await this.repository.findActiveEnrollment(enrollmentId);

    if (!enrollment) {
      throw new AppError(
        400,
        "La inscripción no existe o no está activa"
      );
    }
  }

  async getOne(id: number): Promise<AttemptResponseDto> {
    const attempt = await this.findOrFail(id);

    return toAttemptResponseDto(attempt);
  }

  async create(
    data: CreateAttemptDto
  ): Promise<AttemptResponseDto> {
    await this.validateActiveEnrollment(data.enrollment_id);

    const attempt = await this.repository.create(data);

    return toAttemptResponseDto(attempt);
  }

  async update(
    id: number,
    data: UpdateAttemptDto
  ): Promise<AttemptResponseDto> {
    const attempt = await this.findOrFail(id);

    await this.validateActiveEnrollment(data.enrollment_id);

    const updatedAttempt = await this.repository.update(
      attempt,
      data
    );

    return toAttemptResponseDto(updatedAttempt);
  }

  async patch(
    id: number,
    data: PatchAttemptDto
  ): Promise<AttemptResponseDto> {
    const attempt = await this.findOrFail(id);

    if (data.enrollment_id !== undefined) {
      await this.validateActiveEnrollment(data.enrollment_id);
    }

    const updatedAttempt = await this.repository.patch(
      attempt,
      data
    );

    return toAttemptResponseDto(updatedAttempt);
  }

  async delete(id: number): Promise<void> {
    const attempt = await this.findOrFail(id);

    await this.repository.delete(attempt);
  }

  async deactivate(
    id: number
  ): Promise<AttemptResponseDto> {
    const attempt = await this.findOrFail(id);

    const deactivatedAttempt =
      await this.repository.deactivate(attempt);

    return toAttemptResponseDto(deactivatedAttempt);
  }
}