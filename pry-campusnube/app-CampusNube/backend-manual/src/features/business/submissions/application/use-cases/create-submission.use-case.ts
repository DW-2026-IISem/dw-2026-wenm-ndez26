import { Inject, Injectable } from '@nestjs/common';

import { SUBMISSION_REPOSITORY } from '../../domain/interfaces/submission-repository.interface.js';
import type { ISubmissionRepository } from '../../domain/interfaces/submission-repository.interface.js';

import { SubmissionDomainService } from '../../domain/services/submission-domain.service.js';

import { CreateSubmissionDto } from '../dto/create-submission.dto.js';
import { SubmissionResponseDto } from '../dto/submission-response.dto.js';
import { SubmissionMapper } from '../mappers/submission.mapper.js';

@Injectable()
export class CreateSubmissionUseCase {
  private readonly domainService = new SubmissionDomainService();

  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(
    dto: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);

    this.domainService.validate(
      dto.referenceId,
      startDate,
      endDate,
      dto.total,
      dto.status,
    );

    const submission = SubmissionMapper.toEntity(dto);

    const created =
      await this.submissionRepository.create(submission);

    return SubmissionMapper.toResponse(created);
  }
}
