import { Inject, Injectable } from '@nestjs/common';
import { MODULE_REPOSITORY } from '../../domain/interfaces/module-repository.interface.js';
import type { IModuleRepository } from '../../domain/interfaces/module-repository.interface.js';
import { ModuleNotFoundException } from '../../domain/exceptions/module-not-found.exception.js';
import { ModuleDomainService } from '../../domain/services/module-domain.service.js';
import { UpdateModuleDto } from '../dto/update-module.dto.js';
import { ModuleMapper } from '../mappers/module.mapper.js';

@Injectable()
export class UpdateModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: IModuleRepository,
    private readonly moduleDomainService: ModuleDomainService,
  ) {}

  async execute(id: number, dto: UpdateModuleDto) {
    const existing = await this.moduleRepository.findById(id);

    if (!existing) {
      throw new ModuleNotFoundException(id);
    }

    if (dto.order !== undefined) {
      this.moduleDomainService.validateOrder(dto.order);
    }

    const updated = await this.moduleRepository.update(id, dto);

    return ModuleMapper.toResponse(updated);
  }
}
