import { Inject, Injectable } from '@nestjs/common';

import {
  APPRENTICE_REPOSITORY,
  type IApprenticeRepository,
} from '../../domain/interfaces/apprentice-repository.interface.js';

import { ApprenticeFilterDto } from '../dto/apprentice-filter.dto.js';
import { ApprenticeMapper } from '../mappers/apprentice.mapper.js';

@Injectable()
export class ListApprenticesUseCase {
  constructor(
    @Inject(APPRENTICE_REPOSITORY)
    private readonly apprenticeRepository: IApprenticeRepository,
  ) {}

  async execute(filter: ApprenticeFilterDto) {
    const result =
      await this.apprenticeRepository.findAll(filter);

    return {
      items: result.items.map((apprentice) =>
        ApprenticeMapper.toResponse(apprentice),
      ),
      meta: result.meta,
    };
  }
}
