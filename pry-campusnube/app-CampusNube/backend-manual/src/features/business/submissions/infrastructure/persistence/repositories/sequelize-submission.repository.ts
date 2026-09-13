import { Injectable } from '@nestjs/common';

import { SubmissionEntity } from '../../../domain/entities/submission.entity.js';
import {
  SubmissionFindAllParams,
  SUBMISSION_REPOSITORY,
  SubmissionUpdateData,
  ISubmissionRepository,
} from '../../../domain/interfaces/submission-repository.interface.js';

import { SubmissionModel } from '../models/submission.model.js';

@Injectable()
export class SequelizeSubmissionRepository
  implements ISubmissionRepository
{
  async create(
    submission: SubmissionEntity,
  ): Promise<SubmissionEntity> {
    const model = await SubmissionModel.create({
      referenceId: submission.getReferenceId(),
      startDate: submission.getStartDate(),
      endDate: submission.getEndDate(),
      total: submission.getTotal(),
      status: submission.getStatus(),
      observations: submission.getObservations() ?? null,
    });

    return this.toDomain(model);
  }

  async findAll(
    params: SubmissionFindAllParams = {},
  ): Promise<SubmissionEntity[]> {
    const where: Record<string, unknown> = {};

    if (params.referenceId !== undefined) {
      where.referenceId = params.referenceId;
    }

    if (params.status !== undefined) {
      where.status = params.status;
    }

    const models = await SubmissionModel.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<SubmissionEntity | null> {
    const model = await SubmissionModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async findByReferenceId(
    referenceId: number,
  ): Promise<SubmissionEntity[]> {
    const models = await SubmissionModel.findAll({
      where: { referenceId },
      order: [['createdAt', 'DESC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async update(
    id: number,
    data: SubmissionUpdateData,
  ): Promise<SubmissionEntity> {
    const model = await SubmissionModel.findByPk(id);

    if (!model) {
      throw new Error(`Submission ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await SubmissionModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: SubmissionModel): SubmissionEntity {
    return new SubmissionEntity({
      id: model.id,
      referenceId: model.referenceId,
      startDate: model.startDate,
      endDate: model.endDate,
      total: Number(model.total),
      status: model.status,
      observations: model.observations ?? undefined,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}

export const submissionRepositoryProvider = {
  provide: SUBMISSION_REPOSITORY,
  useClass: SequelizeSubmissionRepository,
};
