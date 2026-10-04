import { AppError } from "../../../shared/errors/app-error";
import { Submission } from "./submission.model";
import { SubmissionRepository } from "./submission.repository";
import {
  CreateSubmissionDto,
  PatchSubmissionDto,
  SubmissionResponseDto,
  UpdateSubmissionDto,
  toSubmissionResponse,
} from "./dto";

/**
 * Service de Submission.
 *
 * Contiene las reglas de negocio.
 * No conoce req/res ni accede directamente a Sequelize.
 */
export class SubmissionService {
  public constructor(
    private readonly repository: SubmissionRepository =
      new SubmissionRepository()
  ) {}

  // ================== READ ==================

  public async getAll(): Promise<SubmissionResponseDto[]> {
    const submissions =
      await this.repository.findAll();

    return submissions.map(toSubmissionResponse);
  }

  public async findOrFail(
    id: number
  ): Promise<Submission> {
    const submission =
      await this.repository.findById(id);

    if (!submission) {
      throw new AppError(
        404,
        "Entrega no encontrada"
      );
    }

    return submission;
  }

  public async getOne(
    id: number
  ): Promise<SubmissionResponseDto> {
    const submission =
      await this.findOrFail(id);

    return toSubmissionResponse(submission);
  }

  // ================== CREATE ==================

  private async validateActiveLesson(
    lessonId: number
  ): Promise<void> {
    const lesson =
      await this.repository.findActiveLesson(
        lessonId
      );

    if (!lesson) {
      throw new AppError(
        400,
        "La lección no existe o no está activa"
      );
    }
  }

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
    body: CreateSubmissionDto
  ): Promise<SubmissionResponseDto> {
    await this.validateActiveLesson(
      body.lesson_id
    );

    await this.validateActiveEnrollment(
      body.enrollment_id
    );

    const submission =
      await this.repository.create(body);

    return toSubmissionResponse(submission);
  }

  // ================== UPDATE ==================

  public async update(
    id: number,
    body: UpdateSubmissionDto
  ): Promise<SubmissionResponseDto> {
    const submission =
      await this.findOrFail(id);

    await this.validateActiveLesson(
      body.lesson_id
    );

    await this.validateActiveEnrollment(
      body.enrollment_id
    );

    const updated =
      await this.repository.update(
        submission,
        body
      );

    return toSubmissionResponse(updated);
  }

  public async patch(
    id: number,
    body: PatchSubmissionDto
  ): Promise<SubmissionResponseDto> {
    const submission =
      await this.findOrFail(id);

    if (body.lesson_id !== undefined) {
      await this.validateActiveLesson(
        body.lesson_id
      );
    }

    if (body.enrollment_id !== undefined) {
      await this.validateActiveEnrollment(
        body.enrollment_id
      );
    }

    const updated =
      await this.repository.patch(
        submission,
        body
      );

    return toSubmissionResponse(updated);
  }

  // ================== DELETE ==================

  public async delete(
    id: number
  ): Promise<void> {
    const submission =
      await this.findOrFail(id);

    await this.repository.delete(
      submission
    );
  }

  public async deactivate(
    id: number
  ): Promise<SubmissionResponseDto> {
    const submission =
      await this.findOrFail(id);

    const updated =
      await this.repository.deactivate(
        submission
      );

    return toSubmissionResponse(updated);
  }
}