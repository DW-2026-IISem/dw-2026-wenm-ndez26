import { ConflictException } from '@nestjs/common';

export class CourseNameAlreadyExistsException extends ConflictException {
  constructor(name: string) {
    super(`El curso '${name}' ya está registrado`);
  }
}
