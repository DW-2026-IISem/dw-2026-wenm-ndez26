import { Inject, Injectable } from '@nestjs/common';

import {
  COURSE_REPOSITORY,
  type ICourseRepository,
} from '../../domain/interfaces/course-repository.interface.js';
import { CourseNotFoundException } from '../../domain/exceptions/course-not-found.exception.js';
import { CourseMapper } from '../mappers/course.mapper.js';

@Injectable()
export class GetCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
  ) {}

  async execute(id: number) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new CourseNotFoundException(id);
    }

    return CourseMapper.toResponse(course);
  }
}
