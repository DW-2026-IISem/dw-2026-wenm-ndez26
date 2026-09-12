import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception.js';

export class ModuleNotFoundException extends EntityNotFoundException {
  constructor(identifier: string | number) {
    super('Módulo', identifier);
  }
}
