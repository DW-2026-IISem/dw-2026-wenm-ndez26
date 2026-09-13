import { Injectable } from '@nestjs/common';
import { InvalidProgressException } from '../exceptions/invalid-progress.exception.js';

@Injectable()
export class ProgressDomainService {
  validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new InvalidProgressException();
    }
  }
}
