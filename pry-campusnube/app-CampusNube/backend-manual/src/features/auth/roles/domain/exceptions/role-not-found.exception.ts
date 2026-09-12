import { NotFoundException } from '@nestjs/common';

export class RoleNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Rol no encontrado: ${identifier}`);
  }
}
