import { Inject, Injectable } from '@nestjs/common';

import { AttemptNotFoundException } from '../../domain/exceptions/attempt-not-found.exception.js';
import { ATTEMPT_REPOSITORY } from '../../domain/interfaces/attempt-repository.interface.js';
import type { IAttemptRepository } from '../../domain/interfaces/attempt-repository.interface.js';

import { AttemptResponseDto } from '../dto/attempt-response.dto.js';
import { AttemptMapper } from '../mappers/attempt.mapper.js';

@Injectable()
export class GetAttemptUseCase {
  constructor(
    @Inject(ATTEMPT_REPOSITORY)
    private readonly attemptRepository: IAttemptRepository,
  ) {}

  async execute(id: number): Promise<AttemptResponseDto> {
    const attempt =
      await this.attemptRepository.findById(id);

    if (!attempt) {
      throw new AttemptNotFoundException(id);
    }

    return AttemptMapper.toResponse(attempt);
  }
}
