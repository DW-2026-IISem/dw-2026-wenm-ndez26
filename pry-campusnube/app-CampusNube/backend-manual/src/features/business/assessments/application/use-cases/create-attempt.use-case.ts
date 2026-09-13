import { Inject, Injectable } from '@nestjs/common';

import { ATTEMPT_REPOSITORY } from '../../domain/interfaces/attempt-repository.interface.js';
import type { IAttemptRepository } from '../../domain/interfaces/attempt-repository.interface.js';

import { AttemptDomainService } from '../../domain/services/attempt-domain.service.js';

import { CreateAttemptDto } from '../dto/create-attempt.dto.js';
import { AttemptResponseDto } from '../dto/attempt-response.dto.js';
import { AttemptMapper } from '../mappers/attempt.mapper.js';

@Injectable()
export class CreateAttemptUseCase {
  private readonly domainService = new AttemptDomainService();

  constructor(
    @Inject(ATTEMPT_REPOSITORY)
    private readonly attemptRepository: IAttemptRepository,
  ) {}

  async execute(
    dto: CreateAttemptDto,
  ): Promise<AttemptResponseDto> {
    this.domainService.validate(
      dto.enrollmentId,
      dto.name,
    );

    const attempt = AttemptMapper.toEntity(dto);

    const created = await this.attemptRepository.create(attempt);

    return AttemptMapper.toResponse(created);
  }
}
