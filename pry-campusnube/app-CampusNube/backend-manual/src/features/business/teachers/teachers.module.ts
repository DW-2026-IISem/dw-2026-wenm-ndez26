import { Module } from '@nestjs/common';

import { CreateTeacherUseCase } from './application/use-cases/create-teacher.use-case.js';
import { DeleteTeacherUseCase } from './application/use-cases/delete-teacher.use-case.js';
import { GetTeacherUseCase } from './application/use-cases/get-teacher.use-case.js';
import { ListTeachersUseCase } from './application/use-cases/list-teachers.use-case.js';
import { UpdateTeacherUseCase } from './application/use-cases/update-teacher.use-case.js';

import { TeachersController } from './presentation/http/controllers/teachers.controller.js';

import { teacherRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-teacher.repository.js';

@Module({
  controllers: [
    TeachersController,
  ],

  providers: [
    teacherRepositoryProvider,
    CreateTeacherUseCase,
    DeleteTeacherUseCase,
    GetTeacherUseCase,
    ListTeachersUseCase,
    UpdateTeacherUseCase,
  ],

  exports: [
    teacherRepositoryProvider,
  ],
})
export class TeachersModule {}
