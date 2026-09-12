import { Inject, Injectable } from '@nestjs/common';

import { Lesson } from '../../domain/entities/lesson.entity.js';

import {
  LESSON_REPOSITORY,
  type ILessonRepository,
} from '../../domain/interfaces/lesson-repository.interface.js';

import { CreateLessonDto } from '../dto/create-lesson.dto.js';
import { LessonMapper } from '../mappers/lesson.mapper.js';

@Injectable()
export class CreateLessonUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  async execute(dto: CreateLessonDto) {
    const lesson = Lesson.create({
      moduleId: dto.moduleId,
      name: dto.name,
      description: dto.description,
      content: dto.content,
      order: dto.order,
    });

    const created = await this.lessonRepository.create(lesson);

    return LessonMapper.toResponse(created);
  }
}
