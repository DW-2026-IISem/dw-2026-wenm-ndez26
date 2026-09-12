import { Inject, Injectable } from '@nestjs/common';

import { ApprenticeNotFoundException } from '../../domain/exceptions/apprentice-not-found.exception.js';
import {
  APPRENTICE_REPOSITORY,
  type IApprenticeRepository,
} from '../../domain/interfaces/apprentice-repository.interface.js';

import { UpdateApprenticeDto } from '../dto/update-apprentice.dto.js';
import { ApprenticeMapper } from '../mappers/apprentice.mapper.js';

@Injectable()
export class UpdateApprenticeUseCase {
  constructor(
    @Inject(APPRENTICE_REPOSITORY)
    private readonly apprenticeRepository: IApprenticeRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateApprenticeDto,
  ) {
    const apprentice =
      await this.apprenticeRepository.findById(id);

    if (!apprentice) {
      throw new ApprenticeNotFoundException(id);
    }

    apprentice.update(dto);

    const updated =
      await this.apprenticeRepository.update(apprentice);

    return ApprenticeMapper.toResponse(updated);
  }
}
