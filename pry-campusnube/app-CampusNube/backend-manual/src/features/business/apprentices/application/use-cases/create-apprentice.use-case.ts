import { Inject, Injectable } from '@nestjs/common';

import { Apprentice } from '../../domain/entities/apprentice.entity.js';
import {
  APPRENTICE_REPOSITORY,
  type IApprenticeRepository,
} from '../../domain/interfaces/apprentice-repository.interface.js';

import { CreateApprenticeDto } from '../dto/create-apprentice.dto.js';
import { ApprenticeMapper } from '../mappers/apprentice.mapper.js';

@Injectable()
export class CreateApprenticeUseCase {
  constructor(
    @Inject(APPRENTICE_REPOSITORY)
    private readonly apprenticeRepository: IApprenticeRepository,
  ) {}

  async execute(dto: CreateApprenticeDto) {
    const apprentice = Apprentice.create(dto);

    const created =
      await this.apprenticeRepository.create(apprentice);

    return ApprenticeMapper.toResponse(created);
  }
}
