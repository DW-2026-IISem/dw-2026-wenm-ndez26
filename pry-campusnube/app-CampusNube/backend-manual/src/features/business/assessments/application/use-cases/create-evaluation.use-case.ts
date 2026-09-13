import { Inject, Injectable } from '@nestjs/common';

import { EvaluationDomainService } from '../../domain/services/evaluation-domain.service.js';
import { EVALUATION_REPOSITORY } from '../../domain/interfaces/evaluation-repository.interface.js';
import type { IEvaluationRepository } from '../../domain/interfaces/evaluation-repository.interface.js';

import { CreateEvaluationDto } from '../dto/create-evaluation.dto.js';
import { EvaluationResponseDto } from '../dto/evaluation-response.dto.js';
import { EvaluationMapper } from '../mappers/evaluation.mapper.js';

@Injectable()
export class CreateEvaluationUseCase {
  private readonly domainService = new EvaluationDomainService();

  constructor(
    @Inject(EVALUATION_REPOSITORY)
    private readonly evaluationRepository: IEvaluationRepository,
  ) {}

  async execute(
    dto: CreateEvaluationDto,
  ): Promise<EvaluationResponseDto> {
    this.domainService.validate(dto.courseId, dto.name);

    const evaluation = EvaluationMapper.toEntity(dto);

    const created = await this.evaluationRepository.create(
      evaluation,
    );

    return EvaluationMapper.toResponse(created);
  }
}
