import { Inject, Injectable } from '@nestjs/common';

import { LessonNotFoundException } from '../../domain/exceptions/lesson-not-found.exception.js';

import {
  LESSON_REPOSITORY,
  type ILessonRepository,
} from '../../domain/interfaces/lesson-repository.interface.js';

import { LessonMapper } from '../mappers/lesson.mapper.js';

@Injectable()
export class GetLessonUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  async execute(id: number) {
    const lesson = await this.lessonRepository.findById(id);

    if (!lesson) {
      throw new LessonNotFoundException(id);
    }

    return LessonMapper.toResponse(lesson);
  }
}
