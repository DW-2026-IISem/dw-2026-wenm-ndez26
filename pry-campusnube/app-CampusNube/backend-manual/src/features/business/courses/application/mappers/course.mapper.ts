import { Course } from '../../domain/entities/course.entity.js';
import { CourseResponseDto } from '../dto/course-response.dto.js';
import { CourseModel } from '../../infrastructure/persistence/models/course.model.js';

export class CourseMapper {
  static toDomain(model: CourseModel): Course {
    return Course.reconstitute({
      id: model.id,
      name: model.name,
      description: model.description ?? undefined,
      status: model.status,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }

  static toPersistence(course: Course) {
    return {
      id: course.id,
      name: course.name,
      description: course.description ?? null,
      status: course.status,
    };
  }

  static toResponse(course: Course): CourseResponseDto {
    return {
      id: course.id!,
      name: course.name,
      description: course.description,
      status: course.status,
      createdAt: course.createdAt!,
      updatedAt: course.updatedAt!,
    };
  }
}
