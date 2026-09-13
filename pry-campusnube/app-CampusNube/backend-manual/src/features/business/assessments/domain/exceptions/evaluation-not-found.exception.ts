import { NotFoundException } from '@nestjs/common';

export class EvaluationNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Evaluación no encontrada: ${identifier}`);
  }
}
