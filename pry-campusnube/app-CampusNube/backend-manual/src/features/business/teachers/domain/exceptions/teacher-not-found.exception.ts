import { NotFoundException } from '@nestjs/common';

export class TeacherNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Docente no encontrado: ${identifier}`);
  }
}
