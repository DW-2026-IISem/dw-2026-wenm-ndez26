import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidModuleOrderException extends BadRequestException {
  constructor() {
    super('El orden del módulo debe ser un entero mayor a 0');
  }
}
