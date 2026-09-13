import { Module } from '@nestjs/common';

import { CreateSubmissionUseCase } from './application/use-cases/create-submission.use-case.js';
import { DeleteSubmissionUseCase } from './application/use-cases/delete-submission.use-case.js';
import { GetSubmissionUseCase } from './application/use-cases/get-submission.use-case.js';
import { ListSubmissionsUseCase } from './application/use-cases/list-submissions.use-case.js';
import { UpdateSubmissionUseCase } from './application/use-cases/update-submission.use-case.js';

import { SubmissionsController } from './presentation/http/controllers/submissions.controller.js';

import { submissionRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-submission.repository.js';

@Module({
  controllers: [SubmissionsController],
  providers: [
    submissionRepositoryProvider,
    CreateSubmissionUseCase,
    DeleteSubmissionUseCase,
    GetSubmissionUseCase,
    ListSubmissionsUseCase,
    UpdateSubmissionUseCase,
  ],
  exports: [submissionRepositoryProvider],
})
export class SubmissionsModule {}
