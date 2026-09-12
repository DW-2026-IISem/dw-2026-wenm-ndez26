import { Inject, Injectable } from '@nestjs/common';

import { EnrollmentNotFoundException } from '../../domain/exceptions/enrollment-not-found.exception.js';
import {
  type IEnrollmentRepository,
  ENROLLMENT_REPOSITORY,
} from '../../domain/interfaces/enrollment-repository.interface.js';

@Injectable()
export class DeleteEnrollmentUseCase {
  constructor(
    @Inject(ENROLLMENT_REPOSITORY)
    private readonly enrollmentRepository: IEnrollmentRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const enrollment =
      await this.enrollmentRepository.findById(id);

    if (!enrollment) {
      throw new EnrollmentNotFoundException(id);
    }

    await this.enrollmentRepository.delete(id);
  }
}
