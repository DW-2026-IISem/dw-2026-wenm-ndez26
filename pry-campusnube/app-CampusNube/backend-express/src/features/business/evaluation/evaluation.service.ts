import { AppError } from "../../../shared/errors/app-error";
import { Course } from "../course/course.model";
import { EvaluationRepository } from "./evaluation.repository";
import {
  CreateEvaluationDto,
  EvaluationResponseDto,
  PatchEvaluationDto,
  toEvaluationResponseDto,
  UpdateEvaluationDto,
} from "./dto";

export class EvaluationService {
  constructor(
    private readonly evaluationRepository: EvaluationRepository
  ) {}

  async getAll(): Promise<EvaluationResponseDto[]> {
    const evaluations =
      await this.evaluationRepository.findAllActive();

    return evaluations.map(toEvaluationResponseDto);
  }

  async getOne(id: number): Promise<EvaluationResponseDto> {
    const evaluation = await this.findOrFail(id);

    return toEvaluationResponseDto(evaluation);
  }

  async create(
    dto: CreateEvaluationDto
  ): Promise<EvaluationResponseDto> {
    await this.validateActiveCourse(dto.course_id);

    const evaluation =
      await this.evaluationRepository.create({
        course_id: dto.course_id,
        name: dto.name,
        description: dto.description ?? null,
        isActive: dto.isActive ?? true,
      });

    return toEvaluationResponseDto(evaluation);
  }

  async updatePut(
    id: number,
    dto: UpdateEvaluationDto
  ): Promise<EvaluationResponseDto> {
    await this.findOrFail(id);
    await this.validateActiveCourse(dto.course_id);

    const evaluation =
      await this.evaluationRepository.update(id, {
        course_id: dto.course_id,
        name: dto.name,
        description: dto.description ?? null,
      });

    if (!evaluation) {
      throw new AppError(404, "Evaluation not found");
    }

    return toEvaluationResponseDto(evaluation);
  }

  async updatePatch(
    id: number,
    dto: PatchEvaluationDto
  ): Promise<EvaluationResponseDto> {
    await this.findOrFail(id);

    if (dto.course_id !== undefined) {
      await this.validateActiveCourse(dto.course_id);
    }

    const evaluation =
      await this.evaluationRepository.update(id, {
        ...dto,
      });

    if (!evaluation) {
      throw new AppError(404, "Evaluation not found");
    }

    return toEvaluationResponseDto(evaluation);
  }

  async deletePhysical(id: number): Promise<void> {
    await this.findOrFail(id, false);

    await this.evaluationRepository.delete(id);
  }

  async deleteLogical(
    id: number
  ): Promise<EvaluationResponseDto> {
    await this.findOrFail(id);

    const evaluation =
      await this.evaluationRepository.update(id, {
        isActive: false,
      });

    if (!evaluation) {
      throw new AppError(404, "Evaluation not found");
    }

    return toEvaluationResponseDto(evaluation);
  }

  private async findOrFail(
    id: number,
    onlyActive = true
  ) {
    const evaluation =
      await this.evaluationRepository.findById(
        id,
        undefined,
        onlyActive
      );

    if (!evaluation) {
      const message = onlyActive
        ? "Evaluation not found or inactive"
        : "Evaluation not found";

      throw new AppError(404, message);
    }

    return evaluation;
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
