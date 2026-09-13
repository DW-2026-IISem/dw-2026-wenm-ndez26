import { ProgressEntity } from '../../domain/entities/progress.entity.js';
import { ProgressResponseDto } from '../dto/progress-response.dto.js';

export class ProgressMapper {
  static toResponse(progress: ProgressEntity): ProgressResponseDto {
    return {
      id: progress.getId(),
      enrollmentId: progress.getEnrollmentId(),
      name: progress.getName(),
      description: progress.getDescription(),
      isActive: progress.getIsActive(),
      createdAt: progress.getCreatedAt(),
      updatedAt: progress.getUpdatedAt(),
    };
  }
}
