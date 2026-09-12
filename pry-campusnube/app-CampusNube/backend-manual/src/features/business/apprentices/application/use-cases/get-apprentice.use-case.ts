import { Inject, Injectable } from '@nestjs/common';

import { ApprenticeNotFoundException } from '../../domain/exceptions/apprentice-not-found.exception.js';

import {
  APPRENTICE_REPOSITORY,
  type IApprenticeRepository,
} from '../../domain/interfaces/apprentice-repository.interface.js';

import { ApprenticeMapper } from '../mappers/apprentice.mapper.js';

@Injectable()
export class GetApprenticeUseCase {
  constructor(
    @Inject(APPRENTICE_REPOSITORY)
    private readonly apprenticeRepository: IApprenticeRepository,
  ) {}

  async execute(id: number) {
    const apprentice =
      await this.apprenticeRepository.findById(id);

    if (!apprentice) {
      throw new ApprenticeNotFoundException(id);
    }

    return ApprenticeMapper.toResponse(apprentice);
  }
}
