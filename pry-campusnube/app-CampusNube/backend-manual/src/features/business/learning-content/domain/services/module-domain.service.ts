import { Injectable } from '@nestjs/common';
import { InvalidModuleOrderException } from '../exceptions/invalid-module-order.exception.js';

@Injectable()
export class ModuleDomainService {
  validateOrder(order: number): void {
    if (!Number.isInteger(order) || order <= 0) {
      throw new InvalidModuleOrderException();
    }
  }
}
