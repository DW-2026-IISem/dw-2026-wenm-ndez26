import { Module } from '@nestjs/common';
import { CreateModuleUseCase } from './application/use-cases/create-module.use-case.js';
import { DeleteModuleUseCase } from './application/use-cases/delete-module.use-case.js';
import { GetModuleUseCase } from './application/use-cases/get-module.use-case.js';
import { ListModulesUseCase } from './application/use-cases/list-modules.use-case.js';
import { UpdateModuleUseCase } from './application/use-cases/update-module.use-case.js';
import { ModuleDomainService } from './domain/services/module-domain.service.js';
import { moduleRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-module.repository.js';
import { ModulesController } from './presentation/http/controllers/modules.controller.js';

@Module({
  controllers: [ModulesController],
  providers: [
    moduleRepositoryProvider,
    ModuleDomainService,
    CreateModuleUseCase,
    GetModuleUseCase,
    ListModulesUseCase,
    UpdateModuleUseCase,
    DeleteModuleUseCase,
  ],
  exports: [moduleRepositoryProvider],
})
export class LearningContentModule {}
