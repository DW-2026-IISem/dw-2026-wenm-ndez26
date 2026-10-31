"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAttemptResponseDto = toAttemptResponseDto;
function toAttemptResponseDto(attempt) {
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
//# sourceMappingURL=attempt.mapper.js.map