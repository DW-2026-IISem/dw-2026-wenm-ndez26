import { Injectable } from '@nestjs/common';

import { EvaluationEntity } from '../../../domain/entities/evaluation.entity.js';
import {
  EvaluationFindAllParams,
  EVALUATION_REPOSITORY,
  EvaluationUpdateData,
  IEvaluationRepository,
} from '../../../domain/interfaces/evaluation-repository.interface.js';

import { EvaluationModel } from '../models/evaluation.model.js';

@Injectable()
export class SequelizeEvaluationRepository
  implements IEvaluationRepository
{
  async create(
    evaluation: EvaluationEntity,
  ): Promise<EvaluationEntity> {
    const model = await EvaluationModel.create({
      courseId: evaluation.getCourseId(),
      name: evaluation.getName(),
      description: evaluation.getDescription() ?? null,
      isActive: evaluation.getIsActive(),
    });

    return this.toDomain(model);
  }

  async findAll(
    params: EvaluationFindAllParams = {},
  ): Promise<EvaluationEntity[]> {
    const where: Record<string, unknown> = {};

    if (params.courseId !== undefined) {
      where.courseId = params.courseId;
    }

    const models = await EvaluationModel.findAll({
      where,
      order: [['name', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<EvaluationEntity | null> {
    const model = await EvaluationModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async findByCourseId(
    courseId: number,
  ): Promise<EvaluationEntity[]> {
    const models = await EvaluationModel.findAll({
      where: { courseId },
      order: [['name', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async update(
    id: number,
    data: EvaluationUpdateData,
  ): Promise<EvaluationEntity> {
    const model = await EvaluationModel.findByPk(id);

    if (!model) {
      throw new Error(`Evaluation ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await EvaluationModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: EvaluationModel): EvaluationEntity {
    return new EvaluationEntity({
      id: model.id,
      courseId: model.courseId,
      name: model.name,
      description: model.description ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}

export const evaluationRepositoryProvider = {
  provide: EVALUATION_REPOSITORY,
  useClass: SequelizeEvaluationRepository,
};
