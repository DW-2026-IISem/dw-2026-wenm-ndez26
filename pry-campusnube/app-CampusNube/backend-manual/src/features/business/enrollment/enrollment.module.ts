import { Module } from '@nestjs/common';

import { ENROLLMENT_REPOSITORY } from './domain/interfaces/enrollment-repository.interface.js';

import { EnrollmentRepository } from './infrastructure/persistence/repositories/enrollment.repository.js';

import { CreateEnrollmentUseCase } from './application/use-cases/create-enrollment.use-case.js';
import { DeleteEnrollmentUseCase } from './application/use-cases/delete-enrollment.use-case.js';
import { GetEnrollmentUseCase } from './application/use-cases/get-enrollment.use-case.js';
import { ListEnrollmentsUseCase } from './application/use-cases/list-enrollments.use-case.js';
import { UpdateEnrollmentUseCase } from './application/use-cases/update-enrollment.use-case.js';

import { EnrollmentsController } from './presentation/http/controllers/enrollments.controller.js';

@Module({
  controllers: [EnrollmentsController],
  providers: [
    {
      provide: ENROLLMENT_REPOSITORY,
      useClass: EnrollmentRepository,
    },
    CreateEnrollmentUseCase,
    DeleteEnrollmentUseCase,
    GetEnrollmentUseCase,
    ListEnrollmentsUseCase,
    UpdateEnrollmentUseCase,
  ],
  exports: [
    ENROLLMENT_REPOSITORY,
    CreateEnrollmentUseCase,
    DeleteEnrollmentUseCase,
    GetEnrollmentUseCase,
    ListEnrollmentsUseCase,
    UpdateEnrollmentUseCase,
  ],
})
export class EnrollmentModule {}
