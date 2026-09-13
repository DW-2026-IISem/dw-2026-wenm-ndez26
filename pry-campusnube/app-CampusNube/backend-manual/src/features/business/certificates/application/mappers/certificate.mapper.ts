import { CertificateEntity } from '../../domain/entities/certificate.entity.js';
import { CertificateModel } from '../../infrastructure/persistence/models/certificate.model.js';

export class CertificateMapper {
  static toDomain(model: CertificateModel): CertificateEntity {
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

  static toPersistence(
    entity: CertificateEntity,
  ): Partial<CertificateModel> {
    return {
      id: entity.getId(),
      enrollmentId: entity.getEnrollmentId(),
      name: entity.getName(),
      description: entity.getDescription() ?? null,
      isActive: entity.getIsActive(),
    };
  }

  static toResponse(entity: CertificateEntity) {
    return {
      id: entity.getId(),
      enrollmentId: entity.getEnrollmentId(),
      name: entity.getName(),
      description: entity.getDescription(),
      isActive: entity.getIsActive(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }
}
