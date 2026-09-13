import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidEvaluationException extends BadRequestException {
  constructor() {
    super('Los datos de la evaluación no son válidos');
  }
}
