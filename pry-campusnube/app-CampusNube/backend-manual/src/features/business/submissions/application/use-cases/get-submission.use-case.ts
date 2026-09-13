import { Inject, Injectable } from '@nestjs/common';

import { SubmissionNotFoundException } from '../../domain/exceptions/submission-not-found.exception.js';
import { SUBMISSION_REPOSITORY } from '../../domain/interfaces/submission-repository.interface.js';
import type { ISubmissionRepository } from '../../domain/interfaces/submission-repository.interface.js';

import { SubmissionResponseDto } from '../dto/submission-response.dto.js';
import { SubmissionMapper } from '../mappers/submission.mapper.js';

@Injectable()
export class GetSubmissionUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(id: number): Promise<SubmissionResponseDto> {
    const submission =
      await this.submissionRepository.findById(id);

    if (!submission) {
      throw new SubmissionNotFoundException(id);
    }

    return SubmissionMapper.toResponse(submission);
  }
}
