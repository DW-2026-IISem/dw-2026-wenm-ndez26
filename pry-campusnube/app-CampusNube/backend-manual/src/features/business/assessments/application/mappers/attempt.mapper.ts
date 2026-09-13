import { AttemptEntity } from '../../domain/entities/attempt.entity.js';

import { AttemptResponseDto } from '../dto/attempt-response.dto.js';
import { CreateAttemptDto } from '../dto/create-attempt.dto.js';

export class AttemptMapper {
  static toResponse(
    attempt: AttemptEntity,
  ): AttemptResponseDto {
    return {
      id: attempt.getId()!,
      enrollmentId: attempt.getEnrollmentId(),
      name: attempt.getName(),
      description: attempt.getDescription(),
      isActive: attempt.getIsActive(),
      createdAt: attempt.getCreatedAt()!,
      updatedAt: attempt.getUpdatedAt()!,
    };
  }

  static toEntity(
    data: CreateAttemptDto,
  ): AttemptEntity {
    return new AttemptEntity({
      enrollmentId: data.enrollmentId,
      name: data.name,
      description: data.description,
      isActive: data.isActive,
    });
  }
}
