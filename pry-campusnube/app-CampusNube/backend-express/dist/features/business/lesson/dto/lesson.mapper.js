"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLessonResponseDto = toLessonResponseDto;
function toLessonResponseDto(lesson) {
    return {
        id: lesson.id,
        module_id: lesson.module_id,
        name: lesson.name,
        description: lesson.description,
        isActive: lesson.isActive,
        createdAt: lesson.createdAt,
        updatedAt: lesson.updatedAt,
    };
}
//# sourceMappingURL=lesson.mapper.js.map