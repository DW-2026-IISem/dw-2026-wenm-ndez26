import { InvalidAttemptException } from '../exceptions/invalid-attempt.exception.js';

export class AttemptDomainService {
  validate(enrollmentId: number, name: string): void {
    if (!Number.isInteger(enrollmentId) || enrollmentId <= 0) {
      throw new InvalidAttemptException();
    }

    if (!name || name.trim().length === 0) {
      throw new InvalidAttemptException();
    }
  }
}
