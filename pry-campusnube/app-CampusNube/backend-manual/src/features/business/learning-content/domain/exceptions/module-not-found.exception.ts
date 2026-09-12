import { NotFoundException } from '@nestjs/common';

export class ModuleNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Módulo no encontrado: ${identifier}`);
  }
}
