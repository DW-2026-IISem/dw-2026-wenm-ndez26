export interface CreateCertificateDto {
  enrollment_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}
