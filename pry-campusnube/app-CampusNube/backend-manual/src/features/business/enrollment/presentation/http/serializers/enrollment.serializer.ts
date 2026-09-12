import { Enrollment } from '../../../domain/entities/enrollment.entity.js';
import { EnrollmentResponseDto } from '../../../application/dto/enrollment-response.dto.js';
import { EnrollmentMapper } from '../../../application/mappers/enrollment.mapper.js';

export class EnrollmentSerializer {
  static serialize(
    entity: Enrollment,
  ): EnrollmentResponseDto {
    return EnrollmentMapper.toResponse(entity);
  }
}
