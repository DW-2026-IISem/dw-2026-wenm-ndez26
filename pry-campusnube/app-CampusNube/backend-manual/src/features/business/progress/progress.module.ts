import { Module } from '@nestjs/common';

import { progressRepositoryProvider } from './domain/interfaces/progress-repository.interface.js';
import { ProgressDomainService } from './domain/services/progress-domain.service.js';
import { SequelizeProgressRepository } from './infrastructure/persistence/repositories/sequelize-progress.repository.js';
import { ProgressController } from './interfaces/http/progress.controller.js';
import { CreateProgressUseCase } from './application/use-cases/create-progress.use-case.js';
import { DeleteProgressUseCase } from './application/use-cases/delete-progress.use-case.js';
import { GetProgressUseCase } from './application/use-cases/get-progress.use-case.js';
import { ListProgressUseCase } from './application/use-cases/list-progress.use-case.js';
import { UpdateProgressUseCase } from './application/use-cases/update-progress.use-case.js';

@Module({
  controllers: [ProgressController],
  providers: [
    progressRepositoryProvider,
    SequelizeProgressRepository,
    ProgressDomainService,
    CreateProgressUseCase,
    DeleteProgressUseCase,
    GetProgressUseCase,
    ListProgressUseCase,
    UpdateProgressUseCase,
  ],
  exports: [progressRepositoryProvider],
})
export class ProgressModule {}
