import { Status } from '../../../../../common/enums/status.enum.js';

import { Lesson } from '../../domain/entities/lesson.entity.js';
import { LessonModel } from '../../infrastructure/persistence/models/lesson.model.js';

import { LessonResponseDto } from '../dto/lesson-response.dto.js';

export class LessonMapper {
  static toResponse(entity: Lesson): LessonResponseDto {
    return {
      id: entity.id!,
      moduleId: entity.moduleId,
      name: entity.name,
      description: entity.description,
      content: entity.content,
      order: entity.order,
      status: entity.status,
      createdAt: entity.createdAt!,
      updatedAt: entity.updatedAt!,
    };
  }

  static toPersistence(entity: Lesson): Partial<LessonModel> {
    return {
      id: entity.id,
      moduleId: entity.moduleId,
      name: entity.name,
      description: entity.description,
      content: entity.content,
      order: entity.order,
      status: entity.status ?? Status.ACTIVE,
    };
  }
}
