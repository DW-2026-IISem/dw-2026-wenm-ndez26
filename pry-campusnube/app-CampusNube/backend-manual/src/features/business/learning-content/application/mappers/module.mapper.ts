import { ModuleEntity } from '../../domain/entities/module.entity.js';
import { ModuleModel } from '../../infrastructure/persistence/models/module.model.js';

export class ModuleMapper {
  static toDomain(model: ModuleModel): ModuleEntity {
    return new ModuleEntity({
      id: model.id,
      courseId: model.courseId,
      title: model.title,
      description: model.description ?? undefined,
      order: model.order,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toResponse(entity: ModuleEntity) {
    return {
      id: entity.getId(),
      courseId: entity.getCourseId(),
      title: entity.getTitle(),
      description: entity.getDescription(),
      order: entity.getOrder(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }
}
