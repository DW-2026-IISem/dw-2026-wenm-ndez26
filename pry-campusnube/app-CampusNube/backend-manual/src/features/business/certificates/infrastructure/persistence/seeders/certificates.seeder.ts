import { Status } from '../../../../../../common/enums/status.enum.js';
import { CertificateModel } from '../models/certificate.model.js';

export async function seedCertificates(): Promise<void> {
  const existing = await CertificateModel.count();

  if (existing > 0) {
    return;
  }

  await CertificateModel.bulkCreate([
    {
      enrollmentId: 1,
      name: 'Certificado de finalización',
      description: 'Certificado asociado a la inscripción completada.',
      isActive: Status.ACTIVE,
    },
  ]);
}
