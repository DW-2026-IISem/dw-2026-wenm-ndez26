import { NotFoundException } from '@nestjs/common';

export class SubmissionNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Entrega no encontrada: ${identifier}`);
  }
}
