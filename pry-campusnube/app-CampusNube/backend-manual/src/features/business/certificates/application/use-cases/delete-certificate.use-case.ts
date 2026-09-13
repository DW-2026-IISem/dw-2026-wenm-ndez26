import { Inject, Injectable } from '@nestjs/common';

import { CertificateNotFoundException } from '../../domain/exceptions/certificate-not-found.exception.js';
import { CERTIFICATE_REPOSITORY } from '../../domain/interfaces/certificate-repository.interface.js';
import type { ICertificateRepository } from '../../domain/interfaces/certificate-repository.interface.js';

@Injectable()
export class DeleteCertificateUseCase {
  constructor(
    @Inject(CERTIFICATE_REPOSITORY)
    private readonly repository: ICertificateRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const certificate = await this.repository.findById(id);

    if (!certificate) {
      throw new CertificateNotFoundException(id);
    }

    await this.repository.delete(id);
  }
}
