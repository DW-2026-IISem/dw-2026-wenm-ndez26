import { Inject, Injectable } from '@nestjs/common';

import { AttemptNotFoundException } from '../../domain/exceptions/attempt-not-found.exception.js';
import { ATTEMPT_REPOSITORY } from '../../domain/interfaces/attempt-repository.interface.js';
import type { IAttemptRepository } from '../../domain/interfaces/attempt-repository.interface.js';

import { UpdateAttemptDto } from '../dto/update-attempt.dto.js';
import { AttemptResponseDto } from '../dto/attempt-response.dto.js';
import { AttemptMapper } from '../mappers/attempt.mapper.js';

@Injectable()
export class UpdateAttemptUseCase {
  constructor(
    @Inject(ATTEMPT_REPOSITORY)
    private readonly attemptRepository: IAttemptRepository,
  ) {}

  async execute(
    id: number,
    dto: UpdateAttemptDto,
  ): Promise<AttemptResponseDto> {
    const attempt =
      await this.attemptRepository.findById(id);

    if (!attempt) {
      throw new AttemptNotFoundException(id);
    }

    const updated =
      await this.attemptRepository.update(id, dto);

    return AttemptMapper.toResponse(updated);
  }
}
