import { Inject, Injectable } from '@nestjs/common';

import { PROGRESS_REPOSITORY } from '../../domain/interfaces/progress-repository.interface.js';
import type { IProgressRepository } from '../../domain/interfaces/progress-repository.interface.js';
import { ProgressNotFoundException } from '../../domain/exceptions/progress-not-found.exception.js';

@Injectable()
export class DeleteProgressUseCase {
  constructor(
    @Inject(PROGRESS_REPOSITORY)
    private readonly repository: IProgressRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const progress = await this.repository.findById(id);

    if (!progress) {
      throw new ProgressNotFoundException(id);
    }

    await this.repository.delete(id);
  }
}
