import { Apprentice } from '../../../domain/entities/apprentice.entity.js';
import { ApprenticeResponseDto } from '../../../application/dto/apprentice-response.dto.js';
import { ApprenticeMapper } from '../../../application/mappers/apprentice.mapper.js';

export class ApprenticeSerializer {
  static serialize(
    entity: Apprentice,
  ): ApprenticeResponseDto {
    return ApprenticeMapper.toResponse(entity);
  }
}
