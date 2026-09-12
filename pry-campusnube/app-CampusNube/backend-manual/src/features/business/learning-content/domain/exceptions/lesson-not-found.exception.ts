import { NotFoundException } from '../../../../../common/exceptions/not-found.exception.js';

export class LessonNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Lección con id '${id}' no encontrada`);
  }
}
