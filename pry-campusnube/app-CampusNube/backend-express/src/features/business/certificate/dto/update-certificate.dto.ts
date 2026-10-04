export interface UpdateCertificateDto {
  enrollment_id: number;
  name: string;
  description?: string | null;
}
