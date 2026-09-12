import { Inject, Injectable } from '@nestjs/common';
import {
  MODULE_REPOSITORY,
  ModuleFindAllParams,
} from '../../domain/interfaces/module-repository.interface.js';
import type { IModuleRepository } from '../../domain/interfaces/module-repository.interface.js';
import { ModuleMapper } from '../mappers/module.mapper.js';

@Injectable()
export class ListModulesUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: IModuleRepository,
  ) {}

  async execute(params: ModuleFindAllParams = {}) {
    const modules = await this.moduleRepository.findAll(params);

    return modules.map(ModuleMapper.toResponse);
  }
}
