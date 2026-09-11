import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception.js';

export class BadRequestException extends BaseException {
  constructor(message = 'Solicitud inválida') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
