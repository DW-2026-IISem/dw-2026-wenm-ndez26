import { Lesson } from "../lesson.model";
import { LessonResponseDto } from "./lesson-response.dto";

export function toLessonResponseDto(
  lesson: Lesson
): LessonResponseDto {
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
