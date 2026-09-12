import { Inject, Injectable } from '@nestjs/common';

import { EnrollmentNotFoundException } from '../../domain/exceptions/enrollment-not-found.exception.js';
import {
  type IEnrollmentRepository,
  ENROLLMENT_REPOSITORY,
} from '../../domain/interfaces/enrollment-repository.interface.js';

import { EnrollmentMapper } from '../mappers/enrollment.mapper.js';

@Injectable()
export class GetEnrollmentUseCase {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}

  async execute(id: number) {
    const enrollment =
      await this.enrollmentRepository.findById(id);

    if (!enrollment) {
      throw new EnrollmentNotFoundException(id);
    }

    return EnrollmentMapper.toResponse(enrollment);
  }
}
