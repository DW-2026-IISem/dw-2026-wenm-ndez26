import { NotFoundException } from '../../../../../common/exceptions/not-found.exception.js';

export class ApprenticeNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Aprendiz con id '${id}' no encontrado`);
  }
}
