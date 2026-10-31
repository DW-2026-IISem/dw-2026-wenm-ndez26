"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toProgressResponse = toProgressResponse;
/**
 * Mapper: modelo Sequelize -> DTO de respuesta.
 */
function toProgressResponse(progress) {
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
//# sourceMappingURL=progress.mapper.js.map