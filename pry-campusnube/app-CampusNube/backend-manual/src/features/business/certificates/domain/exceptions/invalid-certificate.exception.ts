import { BadRequestException } from '../../../../../common/exceptions/bad-request.exception.js';

export class InvalidCertificateException extends BadRequestException {
  constructor() {
    super('Los datos del certificado no son válidos');
  }
}
