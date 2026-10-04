import { Progress } from "../progress.model";
import { ProgressResponseDto } from "./progress-response.dto";

/**
 * Mapper: modelo Sequelize -> DTO de respuesta.
 */
export function toProgressResponse(
  progress: Progress
): ProgressResponseDto {
  return {
    id: progress.id,
    enrollment_id: progress.enrollment_id,
    name: progress.name,
    description: progress.description,
    isActive: progress.isActive,
    createdAt: progress.createdAt,
    updatedAt: progress.updatedAt,
  };
}
