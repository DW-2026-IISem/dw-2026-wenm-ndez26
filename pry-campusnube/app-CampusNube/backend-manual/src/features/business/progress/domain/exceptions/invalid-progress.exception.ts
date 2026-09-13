import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidProgressException extends BadRequestException {
  constructor() {
    super('Los datos del progreso no son válidos');
  }
}
