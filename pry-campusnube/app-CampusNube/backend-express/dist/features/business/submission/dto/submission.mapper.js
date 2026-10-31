"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSubmissionResponse = toSubmissionResponse;
/**
 * Mapper: modelo Sequelize -> DTO de respuesta.
 */
function toSubmissionResponse(submission) {
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
//# sourceMappingURL=submission.mapper.js.map