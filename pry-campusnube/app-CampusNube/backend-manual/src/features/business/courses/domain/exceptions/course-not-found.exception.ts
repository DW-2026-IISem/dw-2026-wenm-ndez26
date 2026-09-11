import { NotFoundException } from '../../../../../common/exceptions/not-found.exception.js';

export class CourseNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Curso con id '${id}' no encontrado`);
  }
}
