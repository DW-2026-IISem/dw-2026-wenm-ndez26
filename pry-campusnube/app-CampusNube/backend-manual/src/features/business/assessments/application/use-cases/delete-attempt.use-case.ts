import { Inject, Injectable } from '@nestjs/common';

import { AttemptNotFoundException } from '../../domain/exceptions/attempt-not-found.exception.js';
import { ATTEMPT_REPOSITORY } from '../../domain/interfaces/attempt-repository.interface.js';
import type { IAttemptRepository } from '../../domain/interfaces/attempt-repository.interface.js';

@Injectable()
export class DeleteAttemptUseCase {
  constructor(
    @Inject(ATTEMPT_REPOSITORY)
    private readonly attemptRepository: IAttemptRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const attempt =
      await this.attemptRepository.findById(id);

    if (!attempt) {
      throw new AttemptNotFoundException(id);
    }

    await this.attemptRepository.delete(id);
  }
}
