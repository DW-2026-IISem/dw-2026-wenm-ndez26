import { Inject, Injectable } from '@nestjs/common';

import {
  COURSE_REPOSITORY,
  type ICourseRepository,
} from '../../domain/interfaces/course-repository.interface.js';
import { Course } from '../../domain/entities/course.entity.js';
import { CourseNameAlreadyExistsException } from '../../domain/exceptions/course-name-already-exists.exception.js';
import { CourseCreateDto } from '../dto/course-create.dto.js';
import { CourseMapper } from '../mappers/course.mapper.js';

@Injectable()
export class CreateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
  ) {}

  async execute(dto: CourseCreateDto) {
    const existing = await this.courseRepository.findByName(dto.name);

    if (existing) {
      throw new CourseNameAlreadyExistsException(dto.name);
    }

    const course = Course.create({
      name: dto.name,
      description: dto.description,
    });

    const created = await this.courseRepository.create(course);

    return CourseMapper.toResponse(created);
  }
}
