import { Injectable } from '@nestjs/common';
import { ModuleEntity } from '../../../domain/entities/module.entity.js';
import {
  IModuleRepository,
  MODULE_REPOSITORY,
  ModuleFindAllParams,
} from '../../../domain/interfaces/module-repository.interface.js';
import { ModuleModel } from '../models/module.model.js';

@Injectable()
export class SequelizeModuleRepository implements IModuleRepository {
  async create(module: ModuleEntity): Promise<ModuleEntity> {
    const model = await ModuleModel.create({
      courseId: module.getCourseId(),
      title: module.getTitle(),
      description: module.getDescription() ?? null,
      order: module.getOrder(),
    });

    return this.toDomain(model);
  }

  async findAll(
    params: ModuleFindAllParams = {},
  ): Promise<ModuleEntity[]> {
    const where: Record<string, unknown> = {};

    if (params.courseId !== undefined) {
      where.courseId = params.courseId;
    }

    const models = await ModuleModel.findAll({
      where,
      order: [['order', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<ModuleEntity | null> {
    const model = await ModuleModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async findByCourseId(courseId: number): Promise<ModuleEntity[]> {
    const models = await ModuleModel.findAll({
      where: { courseId },
      order: [['order', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async update(
    id: number,
    data: Partial<ModuleEntity>,
  ): Promise<ModuleEntity> {
    const model = await ModuleModel.findByPk(id);

    if (!model) {
      throw new Error(`Module ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await ModuleModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: ModuleModel): ModuleEntity {
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
}

export const moduleRepositoryProvider = {
  provide: MODULE_REPOSITORY,
  useClass: SequelizeModuleRepository,
};
