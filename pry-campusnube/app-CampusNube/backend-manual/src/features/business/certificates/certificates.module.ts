import { Module } from '@nestjs/common';

import { CreateCertificateUseCase } from './application/use-cases/create-certificate.use-case.js';
import { DeleteCertificateUseCase } from './application/use-cases/delete-certificate.use-case.js';
import { GetCertificateUseCase } from './application/use-cases/get-certificate.use-case.js';
import { ListCertificatesUseCase } from './application/use-cases/list-certificates.use-case.js';
import { UpdateCertificateUseCase } from './application/use-cases/update-certificate.use-case.js';
import { CertificateDomainService } from './domain/services/certificate-domain.service.js';
import { certificateRepositoryProvider } from './infrastructure/persistence/repositories/sequelize-certificate.repository.js';
import { CertificatesController } from './presentation/http/controllers/certificates.controller.js';

@Module({
  controllers: [CertificatesController],
  providers: [
    certificateRepositoryProvider,
    CertificateDomainService,
    CreateCertificateUseCase,
    DeleteCertificateUseCase,
    GetCertificateUseCase,
    ListCertificatesUseCase,
    UpdateCertificateUseCase,
  ],
  exports: [certificateRepositoryProvider],
})
export class CertificatesModule {}
