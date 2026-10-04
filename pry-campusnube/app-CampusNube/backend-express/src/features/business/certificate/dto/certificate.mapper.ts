import { Certificate } from "../certificate.model";
import { CertificateResponseDto } from "./certificate-response.dto";

export function toCertificateResponse(
  certificate: Certificate
): CertificateResponseDto {
  return {
    id: certificate.id,
    enrollment_id: certificate.enrollment_id,
    name: certificate.name,
    description: certificate.description,
    isActive: certificate.isActive,
    createdAt: certificate.createdAt,
    updatedAt: certificate.updatedAt,
  };
}
