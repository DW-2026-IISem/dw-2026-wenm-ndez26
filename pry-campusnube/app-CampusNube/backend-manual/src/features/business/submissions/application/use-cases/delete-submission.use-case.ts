import { Inject, Injectable } from '@nestjs/common';

import { SubmissionNotFoundException } from '../../domain/exceptions/submission-not-found.exception.js';
import { SUBMISSION_REPOSITORY } from '../../domain/interfaces/submission-repository.interface.js';
import type { ISubmissionRepository } from '../../domain/interfaces/submission-repository.interface.js';

@Injectable()
export class DeleteSubmissionUseCase {
  constructor(
    @Inject(SUBMISSION_REPOSITORY)
    private readonly submissionRepository: ISubmissionRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const submission =
      await this.submissionRepository.findById(id);

    if (!submission) {
      throw new SubmissionNotFoundException(id);
    }

    await this.submissionRepository.delete(id);
  }
}
