import { Inject, Injectable } from '@nestjs/common';

import { PROGRESS_REPOSITORY } from '../../domain/interfaces/progress-repository.interface.js';
import type {
  IProgressRepository,
  ProgressFindAllParams,
} from '../../domain/interfaces/progress-repository.interface.js';

@Injectable()
export class ListProgressUseCase {
  constructor(
    @Inject(PROGRESS_REPOSITORY)
    private readonly repository: IProgressRepository,
  ) {}

  async execute(params?: ProgressFindAllParams) {
    return this.repository.findAll(params);
  }
}
