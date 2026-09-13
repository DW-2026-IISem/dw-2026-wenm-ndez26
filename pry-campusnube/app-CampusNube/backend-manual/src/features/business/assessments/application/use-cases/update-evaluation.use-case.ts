import { Inject, Injectable } from '@nestjs/common';

import { EvaluationNotFoundException } from '../../domain/exceptions/evaluation-not-found.exception.js';
import { EVALUATION_REPOSITORY } from '../../domain/interfaces/evaluation-repository.interface.js';
import type { IEvaluationRepository } from '../../domain/interfaces/evaluation-repository.interface.js';

import { UpdateEvaluationDto } from '../dto/update-evaluation.dto.js';
import { EvaluationResponseDto } from '../dto/evaluation-response.dto.js';
import { EvaluationMapper } from '../mappers/evaluation.mapper.js';

@Injectable()
export class UpdateEvaluationUseCase {
  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateEvaluationDto,
  ): Promise<EvaluationResponseDto> {
    const evaluation =
      await this.evaluationRepository.findById(id);

    if (!evaluation) {
      throw new EvaluationNotFoundException(id);
    }

    const updated = await this.evaluationRepository.update(id, dto);

    return EvaluationMapper.toResponse(updated);
  }
}
