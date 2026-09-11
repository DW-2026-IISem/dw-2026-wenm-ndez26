import { Module } from '@nestjs/common';

import { COURSE_REPOSITORY } from './domain/interfaces/course-repository.interface.js';
import { CourseRepository } from './infrastructure/persistence/repositories/course.repository.js';

import { CreateCourseUseCase } from './application/use-cases/create-course.use-case.js';
import { UpdateCourseUseCase } from './application/use-cases/update-course.use-case.js';
import { DeleteCourseUseCase } from './application/use-cases/delete-course.use-case.js';
import { GetCourseUseCase } from './application/use-cases/get-course.use-case.js';
import { ListCoursesUseCase } from './application/use-cases/list-courses.use-case.js';

import { CoursesController } from './presentation/http/controllers/courses.controller.js';

@Module({
  controllers: [CoursesController],
  providers: [
    CourseRepository,
    {
      provide: COURSE_REPOSITORY,
      useExisting: CourseRepository,
    },
    CreateCourseUseCase,
    UpdateCourseUseCase,
    DeleteCourseUseCase,
    GetCourseUseCase,
    ListCoursesUseCase,
  ],
  exports: [COURSE_REPOSITORY],
})
export class CoursesModule {}
