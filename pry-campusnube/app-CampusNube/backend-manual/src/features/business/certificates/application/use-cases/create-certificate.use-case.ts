import { Inject, Injectable } from '@nestjs/common';

import { CertificateEntity } from '../../domain/entities/certificate.entity.js';
import { CertificateDomainService } from '../../domain/services/certificate-domain.service.js';
import { CERTIFICATE_REPOSITORY } from '../../domain/interfaces/certificate-repository.interface.js';
import type { ICertificateRepository } from '../../domain/interfaces/certificate-repository.interface.js';
import { CreateCertificateDto } from '../dto/create-certificate.dto.js';

@Injectable()
export class CreateCertificateUseCase {
  constructor(
    @Inject(CERTIFICATE_REPOSITORY)
    private readonly repository: ICertificateRepository,
    private readonly domainService: CertificateDomainService,
  ) {}

  async execute(dto: CreateCertificateDto): Promise<CertificateEntity> {
    this.domainService.validateName(dto.name);

    const certificate = new CertificateEntity(dto);

    return this.repository.create(certificate);
  }
}
