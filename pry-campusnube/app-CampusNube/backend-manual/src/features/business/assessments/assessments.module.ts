import { Module } from '@nestjs/common';

import { CreateEvaluationUseCase } from './application/use-cases/create-evaluation.use-case.js';
import { DeleteEvaluationUseCase } from './application/use-cases/delete-evaluation.use-case.js';
import { GetEvaluationUseCase } from './application/use-cases/get-evaluation.use-case.js';
import { ListEvaluationsUseCase } from './application/use-cases/list-evaluations.use-case.js';
import { UpdateEvaluationUseCase } from './application/use-cases/update-evaluation.use-case.js';

import { EvaluationsController } from './presentation/http/controllers/evaluations.controller.js';

import { evaluationRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-evaluation.repository.js';

@Module({
  controllers: [EvaluationsController],
  providers: [
    evaluationRepositoryProvider,
    CreateEvaluationUseCase,
    DeleteEvaluationUseCase,
    GetEvaluationUseCase,
    ListEvaluationsUseCase,
    UpdateEvaluationUseCase,
  ],
  exports: [evaluationRepositoryProvider],
})
export class AssessmentsModule {}
