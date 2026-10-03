import { Attempt } from "../attempt.model";
import { AttemptResponseDto } from "./attempt-response.dto";

export function toAttemptResponseDto(
  attempt: Attempt
): AttemptResponseDto {
  return {
    id: attempt.id,
    enrollment_id: attempt.enrollment_id,
    name: attempt.name,
    description: attempt.description,
    isActive: attempt.isActive,
    createdAt: attempt.createdAt,
    updatedAt: attempt.updatedAt,
  };
}
