import { Inject, Injectable } from '@nestjs/common';

import { EnrollmentNotFoundException } from '../../domain/exceptions/enrollment-not-found.exception.js';
import {
  type IEnrollmentRepository,
  ENROLLMENT_REPOSITORY,
} from '../../domain/interfaces/enrollment-repository.interface.js';

import { UpdateEnrollmentDto } from '../dto/update-enrollment.dto.js';
import { EnrollmentMapper } from '../mappers/enrollment.mapper.js';

@Injectable()
export class UpdateEnrollmentUseCase {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}

  async execute(id: number, dto: UpdateEnrollmentDto) {
    const enrollment =
      await this.enrollmentRepository.findById(id);

    if (!enrollment) {
      throw new EnrollmentNotFoundException(id);
    }

    enrollment.update(dto);

    const updated =
      await this.enrollmentRepository.update(enrollment);

    return EnrollmentMapper.toResponse(updated);
  }
}
