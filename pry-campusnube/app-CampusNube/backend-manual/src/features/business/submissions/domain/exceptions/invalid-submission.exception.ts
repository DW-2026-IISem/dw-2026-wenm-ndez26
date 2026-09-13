import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidSubmissionException extends BadRequestException {
  constructor() {
    super('Los datos de la entrega no son válidos');
  }
}
