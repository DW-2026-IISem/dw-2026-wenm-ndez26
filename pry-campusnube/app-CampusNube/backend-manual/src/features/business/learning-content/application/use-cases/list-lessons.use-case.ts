import { Inject, Injectable } from '@nestjs/common';

import {
  LESSON_REPOSITORY,
  type ILessonRepository,
} from '../../domain/interfaces/lesson-repository.interface.js';

import { LessonFilterDto } from '../dto/lesson-filter.dto.js';
import { LessonMapper } from '../mappers/lesson.mapper.js';

@Injectable()
export class ListLessonsUseCase {
  constructor(
    @Inject(LESSON_REPOSITORY)
    private readonly lessonRepository: ILessonRepository,
  ) {}

  async execute(filter: LessonFilterDto) {
    const result = await this.lessonRepository.findAll(filter);

    return {
      items: result.items.map((lesson) =>
        LessonMapper.toResponse(lesson),
      ),
      meta: result.meta,
    };
  }
}
