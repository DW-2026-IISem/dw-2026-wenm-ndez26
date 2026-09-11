import { Inject, Injectable } from '@nestjs/common';

import {
  COURSE_REPOSITORY,
  ICourseRepository,
} from '../../domain/interfaces/course-repository.interface.js';
import { CourseNotFoundException } from '../../domain/exceptions/course-not-found.exception.js';

@Injectable()
export class DeleteCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new CourseNotFoundException(id);
    }

    await this.courseRepository.delete(id);
  }
}
