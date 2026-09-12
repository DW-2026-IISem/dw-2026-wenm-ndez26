import { Inject, Injectable } from '@nestjs/common';
import { MODULE_REPOSITORY } from '../../domain/interfaces/module-repository.interface.js';
import type { IModuleRepository } from '../../domain/interfaces/module-repository.interface.js';
import { ModuleNotFoundException } from '../../domain/exceptions/module-not-found.exception.js';
import { ModuleMapper } from '../mappers/module.mapper.js';

@Injectable()
export class GetModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: IModuleRepository,
  ) {}

  async execute(id: number) {
    const module = await this.moduleRepository.findById(id);

    if (!module) {
      throw new ModuleNotFoundException(id);
    }

    return ModuleMapper.toResponse(module);
  }
}
