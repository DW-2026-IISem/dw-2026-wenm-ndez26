import { NotFoundException } from '../../../../../common/exceptions/not-found.exception.js';

export class EnrollmentNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Inscripción con id '${id}' no encontrada`);
  }
}
