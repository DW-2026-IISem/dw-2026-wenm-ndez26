import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidAttemptException extends BadRequestException {
  constructor() {
    super('Los datos del intento no son válidos');
  }
}
