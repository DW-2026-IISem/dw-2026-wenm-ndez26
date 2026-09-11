import { Inject, Injectable } from '@nestjs/common';

import {
  COURSE_REPOSITORY,
  type ICourseRepository,
} from '../../domain/interfaces/course-repository.interface.js';

import { CourseNameAlreadyExistsException } from '../../domain/exceptions/course-name-already-exists.exception.js';
import { CourseNotFoundException } from '../../domain/exceptions/course-not-found.exception.js';

import { CourseUpdateDto } from '../dto/course-update.dto.js';
import { CourseMapper } from '../mappers/course.mapper.js';

@Injectable()
export class UpdateCourseUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRepository,
  ) {}

  async execute(id: number, dto: CourseUpdateDto) {
    const course = await this.courseRepository.findById(id);

    if (!course) {
      throw new CourseNotFoundException(id);
    }

    if (dto.name && dto.name !== course.name) {
      const existing = await this.courseRepository.findByName(dto.name);

      if (existing) {
        throw new CourseNameAlreadyExistsException(dto.name);
      }
    }

    course.update({
      name: dto.name,
      description: dto.description,
    });

    const updated = await this.courseRepository.update(course);

    return CourseMapper.toResponse(updated);
  }
}
