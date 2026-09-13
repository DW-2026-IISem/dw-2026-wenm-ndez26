import { EvaluationEntity } from '../../domain/entities/evaluation.entity.js';
import { CreateEvaluationDto } from '../dto/create-evaluation.dto.js';
import { EvaluationResponseDto } from '../dto/evaluation-response.dto.js';

export class EvaluationMapper {
  static toResponse(
    evaluation: EvaluationEntity,
  ): EvaluationResponseDto {
    return {
      id: evaluation.getId()!,
      courseId: evaluation.getCourseId(),
      name: evaluation.getName(),
      description: evaluation.getDescription(),
      isActive: evaluation.getIsActive(),
      createdAt: evaluation.getCreatedAt()!,
      updatedAt: evaluation.getUpdatedAt()!,
    };
  }

  static toEntity(
    data: CreateEvaluationDto,
  ): EvaluationEntity {
    return new EvaluationEntity({
      courseId: data.courseId,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    });
  }
}
