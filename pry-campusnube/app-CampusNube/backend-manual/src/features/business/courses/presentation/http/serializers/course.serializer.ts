import { Course } from '../../../domain/entities/course.entity.js';
import { CourseResponseDto } from '../../../application/dto/course-response.dto.js';
import { CourseMapper } from '../../../application/mappers/course.mapper.js';

export class CourseSerializer {
  static serialize(entity: Course): CourseResponseDto {
    return CourseMapper.toResponse(entity);
  }
}
