import { Inject, Injectable } from '@nestjs/common';

import { ApprenticeNotFoundException } from '../../domain/exceptions/apprentice-not-found.exception.js';

import {
  APPRENTICE_REPOSITORY,
  type IApprenticeRepository,
} from '../../domain/interfaces/apprentice-repository.interface.js';

@Injectable()
export class DeleteApprenticeUseCase {
  constructor(
    @Inject(APPRENTICE_REPOSITORY)
    private readonly apprenticeRepository: IApprenticeRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const apprentice =
      await this.apprenticeRepository.findById(id);

    if (!apprentice) {
      throw new ApprenticeNotFoundException(id);
    }

    await this.apprenticeRepository.delete(id);
  }
}
