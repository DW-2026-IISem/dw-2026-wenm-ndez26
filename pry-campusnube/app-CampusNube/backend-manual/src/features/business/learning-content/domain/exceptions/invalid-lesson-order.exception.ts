import { DomainException } from '../../../../../common/exceptions/domain.exception.js';

export class InvalidLessonOrderException extends DomainException {
  constructor() {
    super('El orden de la lección debe ser un entero mayor a 0');
  }
}
