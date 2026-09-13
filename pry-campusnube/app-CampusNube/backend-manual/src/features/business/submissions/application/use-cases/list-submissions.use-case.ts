import { Inject, Injectable } from '@nestjs/common';

import { SUBMISSION_REPOSITORY } from '../../domain/interfaces/submission-repository.interface.js';
import type { ISubmissionRepository } from '../../domain/interfaces/submission-repository.interface.js';

import { SubmissionResponseDto } from '../dto/submission-response.dto.js';
import { SubmissionMapper } from '../mappers/submission.mapper.js';

@Injectable()
export class ListSubmissionsUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(
    referenceId?: number,
    status?: string,
  ): Promise<SubmissionResponseDto[]> {
    const submissions =
      await this.submissionRepository.findAll({
        referenceId,
        status,
      });

    return submissions.map((submission) =>
      SubmissionMapper.toResponse(submission),
    );
  }
}
