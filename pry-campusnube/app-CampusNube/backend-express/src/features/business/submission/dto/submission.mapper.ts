import { Submission } from "../submission.model";
import { SubmissionResponseDto } from "./submission-response.dto";

/**
 * Mapper: modelo Sequelize -> DTO de respuesta.
 */
export function toSubmissionResponse(
  submission: Submission
): SubmissionResponseDto {
  return {
    id: submission.id,
    referencia_id: submission.referencia_id,
    lesson_id: submission.lesson_id,
    enrollment_id: submission.enrollment_id,
    fecha_inicio: submission.fecha_inicio,
    fecha_fin: submission.fecha_fin,
    total: submission.total,
    estado: submission.estado,
    observaciones: submission.observaciones,
    createdAt: submission.createdAt,
    updatedAt: submission.updatedAt,
  };
}
