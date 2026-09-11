import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception.js';

export class NotFoundException extends BaseException {
  constructor(message = 'Recurso no encontrado') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
