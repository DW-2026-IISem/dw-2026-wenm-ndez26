import { SubmissionEntity } from '../../domain/entities/submission.entity.js';

import { CreateSubmissionDto } from '../dto/create-submission.dto.js';
import { SubmissionResponseDto } from '../dto/submission-response.dto.js';

export class SubmissionMapper {
  static toResponse(
    submission: SubmissionEntity,
  ): SubmissionResponseDto {
    return {
      id: submission.getId()!,
      referenceId: submission.getReferenceId(),
      startDate: submission.getStartDate(),
      endDate: submission.getEndDate(),
      total: submission.getTotal(),
      status: submission.getStatus(),
      observations: submission.getObservations(),
      createdAt: submission.getCreatedAt()!,
      updatedAt: submission.getUpdatedAt()!,
    };
  }

  static toEntity(
    data: CreateSubmissionDto,
  ): SubmissionEntity {
    return new SubmissionEntity({
      referenceId: data.referenceId,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      total: data.total,
      status: data.status,
      observations: data.observations,
    });
  }
}
