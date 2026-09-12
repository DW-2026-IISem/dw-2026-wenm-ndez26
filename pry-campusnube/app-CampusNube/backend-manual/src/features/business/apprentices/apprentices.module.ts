import { Module } from '@nestjs/common';

import {
  APPRENTICE_REPOSITORY,
} from './domain/interfaces/apprentice-repository.interface.js';

import { ApprenticeRepository } from './infrastructure/persistence/repositories/apprentice.repository.js';

import { CreateApprenticeUseCase } from './application/use-cases/create-apprentice.use-case.js';
import { DeleteApprenticeUseCase } from './application/use-cases/delete-apprentice.use-case.js';
import { GetApprenticeUseCase } from './application/use-cases/get-apprentice.use-case.js';
import { ListApprenticesUseCase } from './application/use-cases/list-apprentices.use-case.js';
import { UpdateApprenticeUseCase } from './application/use-cases/update-apprentice.use-case.js';

import { ApprenticesController } from './presentation/http/controllers/apprentices.controller.js';

@Module({
  controllers: [ApprenticesController],
  providers: [
    {
      provide: APPRENTICE_REPOSITORY,
      useClass: ApprenticeRepository,
    },
    CreateApprenticeUseCase,
    DeleteApprenticeUseCase,
    GetApprenticeUseCase,
    ListApprenticesUseCase,
    UpdateApprenticeUseCase,
  ],
  exports: [
    APPRENTICE_REPOSITORY,
    CreateApprenticeUseCase,
    DeleteApprenticeUseCase,
    GetApprenticeUseCase,
    ListApprenticesUseCase,
    UpdateApprenticeUseCase,
  ],
})
export class ApprenticesModule {}
