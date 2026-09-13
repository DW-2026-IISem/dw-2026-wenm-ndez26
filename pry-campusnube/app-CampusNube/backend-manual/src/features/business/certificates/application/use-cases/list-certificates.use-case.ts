import { Inject, Injectable } from '@nestjs/common';

import { CERTIFICATE_REPOSITORY } from '../../domain/interfaces/certificate-repository.interface.js';
import type {
  CertificateFindAllParams,
  ICertificateRepository,
} from '../../domain/interfaces/certificate-repository.interface.js';

@Injectable()
export class ListCertificatesUseCase {
  constructor(
    @Inject(CERTIFICATE_REPOSITORY)
    private readonly repository: ICertificateRepository,
  ) {}

  async execute(params?: CertificateFindAllParams) {
    return this.repository.findAll(params);
  }
}
