import { Inject, Injectable } from '@nestjs/common';

import { ATTEMPT_REPOSITORY } from '../../domain/interfaces/attempt-repository.interface.js';
import type { IAttemptRepository } from '../../domain/interfaces/attempt-repository.interface.js';

import { AttemptResponseDto } from '../dto/attempt-response.dto.js';
import { AttemptMapper } from '../mappers/attempt.mapper.js';

@Injectable()
export class ListAttemptsUseCase {
  constructor(
    @Inject(ATTEMPT_REPOSITORY)
    private readonly attemptRepository: IAttemptRepository,
  ) {}

  async execute(
    enrollmentId?: number,
  ): Promise<AttemptResponseDto[]> {
    const attempts =
      await this.attemptRepository.findAll({
        enrollmentId,
      });

    return attempts.map((attempt) =>
      AttemptMapper.toResponse(attempt),
    );
  }
}
