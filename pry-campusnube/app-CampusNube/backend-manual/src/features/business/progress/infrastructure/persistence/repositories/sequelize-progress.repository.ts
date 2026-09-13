import { Injectable } from '@nestjs/common';

import { ProgressEntity } from '../../../domain/entities/progress.entity.js';
import {
  IProgressRepository,
  PROGRESS_REPOSITORY,
  ProgressFindAllParams,
  ProgressUpdateData,
} from '../../../domain/interfaces/progress-repository.interface.js';
import { ProgressModel } from '../models/progress.model.js';

@Injectable()
export class SequelizeProgressRepository implements IProgressRepository {
  async create(progress: ProgressEntity): Promise<ProgressEntity> {
    const model = await ProgressModel.create({
      enrollmentId: progress.getEnrollmentId(),
      name: progress.getName(),
      description: progress.getDescription() ?? null,
      isActive: progress.getIsActive(),
    });

    return this.toDomain(model);
  }

  async findAll(
    params: ProgressFindAllParams = {},
  ): Promise<ProgressEntity[]> {
    const where: Record<string, unknown> = {};

    if (params.enrollmentId !== undefined) {
      where.enrollmentId = params.enrollmentId;
    }

    const models = await ProgressModel.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<ProgressEntity | null> {
    const model = await ProgressModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async findByEnrollmentId(
    enrollmentId: number,
  ): Promise<ProgressEntity[]> {
    const models = await ProgressModel.findAll({
      where: { enrollmentId },
      order: [['id', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async update(
    id: number,
    data: ProgressUpdateData,
  ): Promise<ProgressEntity> {
    const model = await ProgressModel.findByPk(id);

    if (!model) {
      throw new Error(`Progress ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await ProgressModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: ProgressModel): ProgressEntity {
    return new ProgressEntity({
      id: model.id,
      enrollmentId: model.enrollmentId,
      name: model.name,
      description: model.description ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}

export const progressRepositoryProvider = {
  provide: PROGRESS_REPOSITORY,
  useClass: SequelizeProgressRepository,
};
