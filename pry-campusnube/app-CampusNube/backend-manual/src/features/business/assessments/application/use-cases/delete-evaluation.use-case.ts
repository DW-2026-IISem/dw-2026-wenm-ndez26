import { Inject, Injectable } from '@nestjs/common';

import { EvaluationNotFoundException } from '../../domain/exceptions/evaluation-not-found.exception.js';
import { EVALUATION_REPOSITORY } from '../../domain/interfaces/evaluation-repository.interface.js';
import type { IEvaluationRepository } from '../../domain/interfaces/evaluation-repository.interface.js';

@Injectable()
export class DeleteEvaluationUseCase {
  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const evaluation =
      await this.evaluationRepository.findById(id);

    if (!evaluation) {
      throw new EvaluationNotFoundException(id);
    }

    await this.evaluationRepository.delete(id);
  }
}
