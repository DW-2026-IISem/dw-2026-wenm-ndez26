import { AppError } from "../../../shared/errors/app-error";
import { Progress } from "./progress.model";
import { ProgressRepository } from "./progress.repository";
import {
  CreateProgressDto,
  PatchProgressDto,
  ProgressResponseDto,
  UpdateProgressDto,
  toProgressResponse,
} from "./dto";

/**
 * Service de Progress.
 *
 * Contiene las reglas de negocio.
 * No conoce req/res ni accede directamente a Sequelize.
 */
export class ProgressService {
  public constructor(
    private readonly repository: ProgressRepository =
      new ProgressRepository()
  ) {}

  // ================== READ ==================

  public async getAll(): Promise<ProgressResponseDto[]> {
    const progress =
      await this.repository.findAll();

    return progress.map(toProgressResponse);
  }

  public async findOrFail(
    id: number
  ): Promise<Progress> {
    const progress =
      await this.repository.findById(id);

    if (!progress) {
      throw new AppError(
        404,
        "Progreso no encontrado"
      );
    }

    return progress;
  }

  public async getOne(
    id: number
  ): Promise<ProgressResponseDto> {
    const progress =
      await this.findOrFail(id);

    return toProgressResponse(progress);
  }

  // ================== CREATE ==================

  private async validateActiveEnrollment(
    enrollmentId: number
  ): Promise<void> {
    const enrollment =
      await this.repository.findActiveEnrollment(
        enrollmentId
      );

    if (!enrollment) {
      throw new AppError(
        400,
        "La inscripción no existe o no está activa"
      );
    }
  }

  public async create(
    body: CreateProgressDto
  ): Promise<ProgressResponseDto> {
    await this.validateActiveEnrollment(
      body.enrollment_id
    );

    const progress =
      await this.repository.create(body);

    return toProgressResponse(progress);
  }

  // ================== UPDATE ==================

  public async update(
    id: number,
    body: UpdateProgressDto
  ): Promise<ProgressResponseDto> {
    const progress =
      await this.findOrFail(id);

    await this.validateActiveEnrollment(
      body.enrollment_id
    );

    const updated =
      await this.repository.update(
        progress,
        body
      );

    return toProgressResponse(updated);
  }

  public async patch(
    id: number,
    body: PatchProgressDto
  ): Promise<ProgressResponseDto> {
    const progress =
      await this.findOrFail(id);

    if (body.enrollment_id !== undefined) {
      await this.validateActiveEnrollment(
        body.enrollment_id
      );
    }

    const updated =
      await this.repository.patch(
        progress,
        body
      );

    return toProgressResponse(updated);
  }

  // ================== DELETE ==================

  public async delete(
    id: number
  ): Promise<void> {
    const progress =
      await this.findOrFail(id);

    await this.repository.delete(
      progress
    );
  }

  public async deactivate(
    id: number
  ): Promise<ProgressResponseDto> {
    const progress =
      await this.findOrFail(id);

    const updated =
      await this.repository.deactivate(
        progress
      );

    return toProgressResponse(updated);
  }
}
