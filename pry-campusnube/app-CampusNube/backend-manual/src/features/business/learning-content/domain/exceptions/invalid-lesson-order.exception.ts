import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidLessonOrderException extends BadRequestException {
  constructor() {
    super('El orden de la lección debe ser un entero mayor a 0');
  }
}
