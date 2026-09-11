import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception.js';

export class UnauthorizedException extends BaseException {
  constructor(message = 'No autorizado') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
