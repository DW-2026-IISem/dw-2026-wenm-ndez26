import { InvalidSubmissionException } from '../exceptions/invalid-submission.exception.js';

export class SubmissionDomainService {
  validate(
    referenceId: number,
    startDate: Date,
    endDate: Date,
    total: number,
    status: string,
  ): void {
    if (!Number.isInteger(referenceId) || referenceId <= 0) {
      throw new InvalidSubmissionException();
    }

    if (!(startDate instanceof Date) || Number.isNaN(startDate.getTime())) {
      throw new InvalidSubmissionException();
    }

    if (!(endDate instanceof Date) || Number.isNaN(endDate.getTime())) {
      throw new InvalidSubmissionException();
    }

    if (endDate < startDate) {
      throw new InvalidSubmissionException();
    }

    if (total < 0) {
      throw new InvalidSubmissionException();
    }

    if (!status || status.trim().length === 0) {
      throw new InvalidSubmissionException();
    }
  }
}
