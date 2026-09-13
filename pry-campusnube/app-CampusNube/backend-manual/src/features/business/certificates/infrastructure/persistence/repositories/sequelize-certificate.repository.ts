import { Injectable } from '@nestjs/common';

import { CertificateEntity } from '../../../domain/entities/certificate.entity.js';
import { CERTIFICATE_REPOSITORY } from '../../../domain/interfaces/certificate-repository.interface.js';
import type {
  CertificateFindAllParams,
  CertificateUpdateData,
  ICertificateRepository,
} from '../../../domain/interfaces/certificate-repository.interface.js';
import { CertificateModel } from '../models/certificate.model.js';

@Injectable()
export class SequelizeCertificateRepository
  implements ICertificateRepository
{
  async create(certificate: CertificateEntity): Promise<CertificateEntity> {
    const model = await CertificateModel.create({
      enrollmentId: certificate.getEnrollmentId(),
      name: certificate.getName(),
      description: certificate.getDescription() ?? null,
      isActive: certificate.getIsActive(),
    });

    return this.toDomain(model);
  }

  async findAll(
    params: CertificateFindAllParams = {},
  ): Promise<CertificateEntity[]> {
    const where: Record<string, unknown> = {};

    if (params.enrollmentId !== undefined) {
      where.enrollmentId = params.enrollmentId;
    }

    const models = await CertificateModel.findAll({
      where,
      order: [['id', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<CertificateEntity | null> {
    const model = await CertificateModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async findByEnrollmentId(
    enrollmentId: number,
  ): Promise<CertificateEntity | null> {
    const model = await CertificateModel.findOne({
      where: { enrollmentId },
    });

    return model ? this.toDomain(model) : null;
  }

  async update(
    id: number,
    data: CertificateUpdateData,
  ): Promise<CertificateEntity> {
    const model = await CertificateModel.findByPk(id);

    if (!model) {
      throw new Error(`Certificate ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await CertificateModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: CertificateModel): CertificateEntity {
    return new CertificateEntity({
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

export const certificateRepositoryProvider = {
  provide: CERTIFICATE_REPOSITORY,
  useClass: SequelizeCertificateRepository,
};
