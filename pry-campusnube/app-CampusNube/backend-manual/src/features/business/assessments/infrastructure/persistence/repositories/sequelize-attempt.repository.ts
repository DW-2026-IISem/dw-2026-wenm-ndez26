import { Injectable } from '@nestjs/common';

import { AttemptEntity } from '../../../domain/entities/attempt.entity.js';
import {
  AttemptFindAllParams,
  ATTEMPT_REPOSITORY,
  AttemptUpdateData,
  IAttemptRepository,
} from '../../../domain/interfaces/attempt-repository.interface.js';

import { AttemptModel } from '../models/attempt.model.js';

@Injectable()
export class SequelizeAttemptRepository implements IAttemptRepository {
  async create(attempt: AttemptEntity): Promise<AttemptEntity> {
    const model = await AttemptModel.create({
      enrollmentId: attempt.getEnrollmentId(),
      name: attempt.getName(),
      description: attempt.getDescription() ?? null,
      isActive: attempt.getIsActive(),
    });

    return this.toDomain(model);
  }

  async findAll(
    params: AttemptFindAllParams = {},
  ): Promise<AttemptEntity[]> {
    const where: Record<string, unknown> = {};

    if (params.enrollmentId !== undefined) {
      where.enrollmentId = params.enrollmentId;
    }

    const models = await AttemptModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<AttemptEntity | null> {
    const model = await AttemptModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async findByEnrollmentId(
    enrollmentId: number,
  ): Promise<AttemptEntity[]> {
    const models = await AttemptModel.findAll({
      where: { enrollmentId },
      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async update(
    id: number,
    data: AttemptUpdateData,
  ): Promise<AttemptEntity> {
    const model = await AttemptModel.findByPk(id);

    if (!model) {
      throw new Error(`Attempt ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await AttemptModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: AttemptModel): AttemptEntity {
    return new AttemptEntity({
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

export const attemptRepositoryProvider = {
  provide: ATTEMPT_REPOSITORY,
  useClass: SequelizeAttemptRepository,
};
