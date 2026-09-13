import { Inject, Injectable } from '@nestjs/common';

import { SubmissionNotFoundException } from '../../domain/exceptions/submission-not-found.exception.js';
import { SUBMISSION_REPOSITORY } from '../../domain/interfaces/submission-repository.interface.js';
import type { ISubmissionRepository } from '../../domain/interfaces/submission-repository.interface.js';

import { UpdateSubmissionDto } from '../dto/update-submission.dto.js';
import { SubmissionResponseDto } from '../dto/submission-response.dto.js';
import { SubmissionMapper } from '../mappers/submission.mapper.js';

@Injectable()
export class UpdateSubmissionUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    const submission =
      await this.submissionRepository.findById(id);

    if (!submission) {
      throw new SubmissionNotFoundException(id);
    }

    const data = {
      ...(dto.referenceId !== undefined && {
        referenceId: dto.referenceId,
      }),
      ...(dto.startDate !== undefined && {
        startDate: new Date(dto.startDate),
      }),
      ...(dto.endDate !== undefined && {
        endDate: new Date(dto.endDate),
      }),
      ...(dto.total !== undefined && {
        total: dto.total,
      }),
      ...(dto.status !== undefined && {
        status: dto.status,
      }),
      ...(dto.observations !== undefined && {
        observations: dto.observations,
      }),
    };

    const updated =
      await this.submissionRepository.update(id, data);

    return SubmissionMapper.toResponse(updated);
  }
}
