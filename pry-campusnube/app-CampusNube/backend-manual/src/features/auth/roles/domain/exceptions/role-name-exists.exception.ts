import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class RoleNameExistsException extends BadRequestException {
  constructor(name: string) {
    super(`El rol ${name} ya existe`);
  }
}
