import { NotFoundException } from '@nestjs/common';

export class CertificateNotFoundException extends NotFoundException {
  constructor(identifier: string | number) {
    super(`Certificado no encontrado: ${identifier}`);
  }
}
