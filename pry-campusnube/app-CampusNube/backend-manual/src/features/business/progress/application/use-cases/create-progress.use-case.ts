import { Inject, Injectable } from '@nestjs/common';

import { ProgressEntity } from '../../domain/entities/progress.entity.js';
import { PROGRESS_REPOSITORY } from '../../domain/interfaces/progress-repository.interface.js';
import type { IProgressRepository } from '../../domain/interfaces/progress-repository.interface.js';
import { CreateProgressDto } from '../dto/create-progress.dto.js';

@Injectable()
export class CreateProgressUseCase {
  constructor(
    @Inject(PROGRESS_REPOSITORY)
    private readonly repository: IProgressRepository,
  ) {}

  async execute(dto: CreateProgressDto): Promise<ProgressEntity> {
    const progress = new ProgressEntity(dto);

    return this.repository.create(progress);
  }
}
