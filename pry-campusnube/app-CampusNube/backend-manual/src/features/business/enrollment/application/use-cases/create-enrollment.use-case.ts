import { Inject, Injectable } from '@nestjs/common';

import { Enrollment } from '../../domain/entities/enrollment.entity.js';
import {
  type IEnrollmentRepository,
  ENROLLMENT_REPOSITORY,
} from '../../domain/interfaces/enrollment-repository.interface.js';

import { CreateEnrollmentDto } from '../dto/create-enrollment.dto.js';
import { EnrollmentMapper } from '../mappers/enrollment.mapper.js';

@Injectable()
export class CreateEnrollmentUseCase {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}

  async execute(dto: CreateEnrollmentDto) {
    const enrollment = Enrollment.create(dto);

    const created = await this.enrollmentRepository.create(
      enrollment,
    );

    return EnrollmentMapper.toResponse(created);
  }
}
