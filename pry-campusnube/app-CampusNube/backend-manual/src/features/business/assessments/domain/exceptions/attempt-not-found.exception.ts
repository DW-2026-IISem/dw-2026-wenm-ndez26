import { NotFoundException } from '@nestjs/common';

export class AttemptNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Intento no encontrado: ${identifier}`);
  }
}
