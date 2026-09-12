import { Lesson } from '../../../domain/entities/lesson.entity.js';
import { LessonResponseDto } from '../../../application/dto/lesson-response.dto.js';
import { LessonMapper } from '../../../application/mappers/lesson.mapper.js';

export class LessonSerializer {
  static serialize(entity: Lesson): LessonResponseDto {
    return LessonMapper.toResponse(entity);
  }
}
