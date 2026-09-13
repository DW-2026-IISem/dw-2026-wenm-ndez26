import { Inject, Injectable } from '@nestjs/common';

import { CertificateNotFoundException } from '../../domain/exceptions/certificate-not-found.exception.js';
import { CERTIFICATE_REPOSITORY } from '../../domain/interfaces/certificate-repository.interface.js';
import type { ICertificateRepository } from '../../domain/interfaces/certificate-repository.interface.js';

@Injectable()
export class GetCertificateUseCase {
  constructor(
    @Inject(CERTIFICATE_REPOSITORY)
    private readonly repository: ICertificateRepository,
  ) {}

  async execute(id: number) {
    const certificate = await this.repository.findById(id);

    if (!certificate) {
      throw new CertificateNotFoundException(id);
    }

    return certificate;
  }
}
