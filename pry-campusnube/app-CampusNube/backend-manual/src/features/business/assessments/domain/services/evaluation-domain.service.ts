import { InvalidEvaluationException } from '../exceptions/invalid-evaluation.exception.js';

export class EvaluationDomainService {
  validate(courseId: number, name: string): void {
    if (!Number.isInteger(courseId) || courseId <= 0) {
      throw new InvalidEvaluationException();
    }

    if (!name || name.trim().length === 0) {
      throw new InvalidEvaluationException();
    }
  }
}
