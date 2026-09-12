import { Inject, Injectable } from '@nestjs/common';
import { MODULE_REPOSITORY } from '../../domain/interfaces/module-repository.interface.js';
import type { IModuleRepository } from '../../domain/interfaces/module-repository.interface.js';
import { ModuleNotFoundException } from '../../domain/exceptions/module-not-found.exception.js';

@Injectable()
export class DeleteModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: IModuleRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.moduleRepository.findById(id);

    if (!existing) {
      throw new ModuleNotFoundException(id);
    }

    await this.moduleRepository.delete(id);
  }
}
