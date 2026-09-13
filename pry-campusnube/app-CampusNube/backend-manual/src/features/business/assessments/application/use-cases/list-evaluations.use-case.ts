import { Inject, Injectable } from '@nestjs/common';

import {
  EVALUATION_REPOSITORY,
} from '../../domain/interfaces/evaluation-repository.interface.js';
import type {
  IEvaluationRepository,
} from '../../domain/interfaces/evaluation-repository.interface.js';

import { EvaluationResponseDto } from '../dto/evaluation-response.dto.js';
import { EvaluationMapper } from '../mappers/evaluation.mapper.js';

@Injectable()
export class ListEvaluationsUseCase {
  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
  ) {}

  async execute(
    courseId?: number,
  ): Promise<EvaluationResponseDto[]> {
    const evaluations =
      await this.evaluationRepository.findAll({ courseId });

    return evaluations.map((evaluation) =>
      EvaluationMapper.toResponse(evaluation),
    );
  }
}
