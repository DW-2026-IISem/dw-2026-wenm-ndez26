import { Inject, Injectable } from '@nestjs/common';

import { EvaluationNotFoundException } from '../../domain/exceptions/evaluation-not-found.exception.js';
import { EVALUATION_REPOSITORY } from '../../domain/interfaces/evaluation-repository.interface.js';
import type { IEvaluationRepository } from '../../domain/interfaces/evaluation-repository.interface.js';

import { EvaluationResponseDto } from '../dto/evaluation-response.dto.js';
import { EvaluationMapper } from '../mappers/evaluation.mapper.js';

@Injectable()
export class GetEvaluationUseCase {
  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
  ) {}

  async execute(id: number): Promise<EvaluationResponseDto> {
    const evaluation =
      await this.evaluationRepository.findById(id);

    if (!evaluation) {
      throw new EvaluationNotFoundException(id);
    }

    return EvaluationMapper.toResponse(evaluation);
  }
}
