import { Inject, Injectable } from '@nestjs/common';

import {
  type IEnrollmentRepository,
  ENROLLMENT_REPOSITORY,
} from '../../domain/interfaces/enrollment-repository.interface.js';

import { EnrollmentFilterDto } from '../dto/enrollment-filter.dto.js';
import { EnrollmentMapper } from '../mappers/enrollment.mapper.js';

@Injectable()
export class ListEnrollmentsUseCase {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}

  async execute(filter: EnrollmentFilterDto) {
    const result = await this.enrollmentRepository.findAll(filter);

    return {
      items: result.items.map((enrollment) =>
        EnrollmentMapper.toResponse(enrollment),
      ),
      meta: result.meta,
    };
  }
}
