import { NotFoundException } from '@nestjs/common';

export class ProgressNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Progreso no encontrado: ${identifier}`);
  }
}
