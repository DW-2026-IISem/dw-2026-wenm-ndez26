import { Enrollment } from '../../domain/entities/enrollment.entity.js';
import { EnrollmentResponseDto } from '../dto/enrollment-response.dto.js';
import { EnrollmentModel } from '../../infrastructure/persistence/models/enrollment.model.js';

export class EnrollmentMapper {
  static toDomain(model: EnrollmentModel): Enrollment {
    return Enrollment.reconstitute({
      id: model.id,
      apprenticeId: model.apprenticeId,
      courseId: model.courseId,
      status: model.status,
      enrolledAt: model.enrolledAt,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toPersistence(enrollment: Enrollment) {
    return {
      id: enrollment.id,
      apprenticeId: enrollment.apprenticeId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt,
    };
  }

  static toResponse(
    enrollment: Enrollment,
  ): EnrollmentResponseDto {
    return {
      id: enrollment.id!,
      apprenticeId: enrollment.apprenticeId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt!,
      createdAt: enrollment.createdAt!,
      updatedAt: enrollment.updatedAt!,
    };
  }
}
