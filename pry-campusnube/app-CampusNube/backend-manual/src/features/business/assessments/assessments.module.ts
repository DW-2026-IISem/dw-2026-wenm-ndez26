import { Module } from '@nestjs/common';

import { CreateEvaluationUseCase } from './application/use-cases/create-evaluation.use-case.js';
import { DeleteEvaluationUseCase } from './application/use-cases/delete-evaluation.use-case.js';
import { GetEvaluationUseCase } from './application/use-cases/get-evaluation.use-case.js';
import { ListEvaluationsUseCase } from './application/use-cases/list-evaluations.use-case.js';
import { UpdateEvaluationUseCase } from './application/use-cases/update-evaluation.use-case.js';

import { CreateAttemptUseCase } from './application/use-cases/create-attempt.use-case.js';
import { DeleteAttemptUseCase } from './application/use-cases/delete-attempt.use-case.js';
import { GetAttemptUseCase } from './application/use-cases/get-attempt.use-case.js';
import { ListAttemptsUseCase } from './application/use-cases/list-attempts.use-case.js';
import { UpdateAttemptUseCase } from './application/use-cases/update-attempt.use-case.js';

import { EvaluationsController } from './presentation/http/controllers/evaluations.controller.js';
import { AttemptsController } from './presentation/http/controllers/attempts.controller.js';

import { evaluationRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-evaluation.repository.js';
import { attemptRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-attempt.repository.js';

@Module({
  controllers: [
    EvaluationsController,
    AttemptsController,
  ],
  providers: [
    evaluationRepositoryProvider,
    attemptRepositoryProvider,

    CreateEvaluationUseCase,
    DeleteEvaluationUseCase,
    GetEvaluationUseCase,
    ListEvaluationsUseCase,
    UpdateEvaluationUseCase,

    CreateAttemptUseCase,
    DeleteAttemptUseCase,
    GetAttemptUseCase,
    ListAttemptsUseCase,
    UpdateAttemptUseCase,
  ],
  exports: [
    evaluationRepositoryProvider,
    attemptRepositoryProvider,
  ],
})
export class AssessmentsModule {}
