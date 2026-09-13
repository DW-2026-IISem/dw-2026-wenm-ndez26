import { Injectable } from '@nestjs/common';

import { InvalidCertificateException } from '../exceptions/invalid-certificate.exception.js';

export interface CertificateEligibility {
  progressCompleted: boolean;
  gradeApproved: boolean;
  mandatoryActivitiesCompleted: boolean;
}

@Injectable()
export class CertificateDomainService {
  validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new InvalidCertificateException();
    }
  }

  validateEligibility(criteria: CertificateEligibility): void {
    if (
      !criteria.progressCompleted ||
      !criteria.gradeApproved ||
      !criteria.mandatoryActivitiesCompleted
    ) {
      throw new InvalidCertificateException();
    }
  }
}
