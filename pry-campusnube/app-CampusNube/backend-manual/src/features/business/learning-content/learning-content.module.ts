import { Module } from '@nestjs/common';

import {
  LESSON_REPOSITORY,
} from './domain/interfaces/lesson-repository.interface.js';

import { LessonRepository } from './infrastructure/persistence/repositories/lesson.repository.js';

import { CreateLessonUseCase } from './application/use-cases/create-lesson.use-case.js';
import { DeleteLessonUseCase } from './application/use-cases/delete-lesson.use-case.js';
import { GetLessonUseCase } from './application/use-cases/get-lesson.use-case.js';
import { ListLessonsUseCase } from './application/use-cases/list-lessons.use-case.js';

import { LessonsController } from './presentation/http/controllers/lessons.controller.js';

@Module({
  controllers: [LessonsController],

  providers: [
    LessonRepository,

    {
      provide: LESSON_REPOSITORY,
      useExisting: LessonRepository,
    },

    CreateLessonUseCase,
    DeleteLessonUseCase,
    GetLessonUseCase,
    ListLessonsUseCase,
  ],

  exports: [LESSON_REPOSITORY],
})
export class LearningContentModule {}
