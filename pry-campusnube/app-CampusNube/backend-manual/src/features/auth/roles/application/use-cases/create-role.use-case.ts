import { Inject, Injectable } from '@nestjs/common';

import { Status } from '../../../../../common/enums/status.enum.js';
import { Role } from '../../domain/entities/role.entity.js';
import { RoleNameExistsException } from '../../domain/exceptions/role-name-exists.exception.js';
import { ROLE_REPOSITORY } from '../../domain/interfaces/role-repository.interface.js';
import type { IRoleRepository } from '../../domain/interfaces/role-repository.interface.js';

import { CreateRoleDto } from '../dto/create-role.dto.js';
import { RoleMapper } from '../mappers/role.mapper.js';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(dto: CreateRoleDto) {
    const existing = await this.roleRepository.findByName(dto.name);

    if (existing) {
      throw new RoleNameExistsException(dto.name);
    }

    const role = new Role({
      name: dto.name,
      isActive: dto.isActive ?? Status.ACTIVE,
    });

    const created = await this.roleRepository.create(role);

    return RoleMapper.toResponse(created);
  }
}
