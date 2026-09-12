import { Apprentice } from '../../domain/entities/apprentice.entity.js';
import { ApprenticeResponseDto } from '../dto/apprentice-response.dto.js';
import { ApprenticeModel } from '../../infrastructure/persistence/models/apprentice.model.js';

export class ApprenticeMapper {
  static toDomain(model: ApprenticeModel): Apprentice {
    return Apprentice.reconstitute({
      id: model.id,
      name: model.name,
      description: model.description,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toPersistence(apprentice: Apprentice) {
    return {
      id: apprentice.id,
      name: apprentice.name,
      description: apprentice.description,
      status: apprentice.status,
    };
  }

  static toResponse(
    apprentice: Apprentice,
  ): ApprenticeResponseDto {
    return {
      id: apprentice.id!,
      name: apprentice.name,
      description: apprentice.description,
      status: apprentice.status,
      createdAt: apprentice.createdAt!,
      updatedAt: apprentice.updatedAt!,
    };
  }
}
