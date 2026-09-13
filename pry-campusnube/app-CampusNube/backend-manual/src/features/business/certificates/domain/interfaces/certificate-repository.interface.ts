import { CertificateEntity } from '../entities/certificate.entity.js';

export const CERTIFICATE_REPOSITORY = 'CERTIFICATE_REPOSITORY';

export interface CertificateFindAllParams {
  enrollmentId?: number;
  page?: number;
  limit?: number;
}

export interface CertificateUpdateData {
  enrollmentId?: number;
  name?: string;
  description?: string;
  isActive?: string;
}

export interface ICertificateRepository {
  create(certificate: CertificateEntity): Promise<CertificateEntity>;
  findAll(params?: CertificateFindAllParams): Promise<CertificateEntity[]>;
  findById(id: number): Promise<CertificateEntity | null>;
  findByEnrollmentId(
    enrollmentId: number,
  ): Promise<CertificateEntity | null>;
  update(
    id: number,
    data: CertificateUpdateData,
  ): Promise<CertificateEntity>;
  delete(id: number): Promise<void>;
}
