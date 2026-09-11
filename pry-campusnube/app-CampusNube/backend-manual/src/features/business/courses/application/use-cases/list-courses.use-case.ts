import { Inject, Injectable } from '@nestjs/common';

import {
  COURSE_REPOSITORY,
  type ICourseRepository,
} from '../../domain/interfaces/course-repository.interface.js';

import { CourseFilterDto } from '../dto/course-filter.dto.js';
import { CourseMapper } from '../mappers/course.mapper.js';

@Injectable()
export class ListCoursesUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
  ) {}

  async execute(filter: CourseFilterDto) {
    const result = await this.courseRepository.findAll(filter);

    return {
      items: result.items.map((course) =>
        CourseMapper.toResponse(course),
      ),
      meta: result.meta,
    };
  }
}
