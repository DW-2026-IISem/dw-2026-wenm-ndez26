import { AppError } from "../../../shared/errors/app-error";
import { CertificateRepository } from "./certificate.repository";
import {
  CertificateResponseDto,
  CreateCertificateDto,
  PatchCertificateDto,
  toCertificateResponse,
  UpdateCertificateDto,
} from "./dto";

export class CertificateService {
  private readonly repository = new CertificateRepository();

  private async findOrFail(id: number) {
    const certificate = await this.repository.findById(id);

    if (!certificate) {
      throw new AppError(404, "Certificate not found");
    }

    return certificate;
  }

  private async validateActiveEnrollment(
    enrollmentId: number
  ): Promise<void> {
    const enrollment =
      await this.repository.findActiveEnrollment(enrollmentId);

    if (!enrollment) {
      throw new AppError(
        404,
        "The indicated enrollment does not exist or is inactive"
      );
    }
  }

  public async getAll(): Promise<CertificateResponseDto[]> {
    const certificates = await this.repository.findAll();

    return certificates.map(toCertificateResponse);
  }

  public async getOne(
    id: number
  ): Promise<CertificateResponseDto> {
    const certificate = await this.findOrFail(id);

    return toCertificateResponse(certificate);
  }

  public async create(
    data: CreateCertificateDto
  ): Promise<CertificateResponseDto> {
    await this.validateActiveEnrollment(data.enrollment_id);

    const existing =
      await this.repository.findByEnrollmentId(
        data.enrollment_id
      );

    if (existing) {
      throw new AppError(
        409,
        "The enrollment already has an associated certificate"
      );
    }

    const certificate =
      await this.repository.create(data);

    return toCertificateResponse(certificate);
  }

  public async update(
    id: number,
    data: UpdateCertificateDto
  ): Promise<CertificateResponseDto> {
    const certificate = await this.findOrFail(id);

    await this.validateActiveEnrollment(data.enrollment_id);

    if (data.enrollment_id !== certificate.enrollment_id) {
      const existing =
        await this.repository.findByEnrollmentId(
          data.enrollment_id
        );

      if (existing && existing.id !== certificate.id) {
        throw new AppError(
          409,
          "The enrollment already has an associated certificate"
        );
      }
    }

    const updated =
      await this.repository.update(certificate, data);

    return toCertificateResponse(updated);
  }

  public async patch(
    id: number,
    data: PatchCertificateDto
  ): Promise<CertificateResponseDto> {
    const certificate = await this.findOrFail(id);

    if (data.enrollment_id !== undefined) {
      await this.validateActiveEnrollment(
        data.enrollment_id
      );

      if (data.enrollment_id !== certificate.enrollment_id) {
        const existing =
          await this.repository.findByEnrollmentId(
            data.enrollment_id
          );

        if (existing && existing.id !== certificate.id) {
          throw new AppError(
            409,
            "The enrollment already has an associated certificate"
          );
        }
      }
    }

    const updated =
      await this.repository.patch(certificate, data);

    return toCertificateResponse(updated);
  }

  public async delete(id: number): Promise<void> {
    const certificate = await this.findOrFail(id);

    await this.repository.delete(certificate);
  }

  public async deactivate(
    id: number
  ): Promise<CertificateResponseDto> {
    const certificate = await this.findOrFail(id);

    const updated =
      await this.repository.deactivate(certificate);

    return toCertificateResponse(updated);
  }
}
