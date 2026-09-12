import { Inject, Injectable } from '@nestjs/common';
import { ModuleEntity } from '../../domain/entities/module.entity.js';
import { MODULE_REPOSITORY } from '../../domain/interfaces/module-repository.interface.js';
import type { IModuleRepository } from '../../domain/interfaces/module-repository.interface.js';
import { ModuleDomainService } from '../../domain/services/module-domain.service.js';
import { CreateModuleDto } from '../dto/create-module.dto.js';
import { ModuleMapper } from '../mappers/module.mapper.js';

@Injectable()
export class CreateModuleUseCase {
  constructor(
    @Inject(MODULE_REPOSITORY)
    private readonly moduleRepository: IModuleRepository,
    private readonly moduleDomainService: ModuleDomainService,
  ) {}

  async execute(dto: CreateModuleDto) {
    this.moduleDomainService.validateOrder(dto.order);

    const module = new ModuleEntity({
      courseId: dto.courseId,
      title: dto.title,
      description: dto.description,
      order: dto.order,
    });

    const created = await this.moduleRepository.create(module);

    return ModuleMapper.toResponse(created);
  }
}
