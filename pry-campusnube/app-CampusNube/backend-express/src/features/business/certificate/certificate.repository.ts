import { CreationAttributes } from "sequelize";
import { Enrollment } from "../enrollment/enrollment.model";
import { Certificate } from "./certificate.model";
import {
  CreateCertificateDto,
  PatchCertificateDto,
  UpdateCertificateDto,
} from "./dto";

export class CertificateRepository {
  public async findAll(): Promise<Certificate[]> {
    return Certificate.findAll({
      where: {
        isActive: true,
      },
    });
  }

  public async findById(id: number): Promise<Certificate | null> {
    return Certificate.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  public async findByEnrollmentId(
    enrollmentId: number
  ): Promise<Certificate | null> {
    return Certificate.findOne({
      where: {
        enrollment_id: enrollmentId,
      },
    });
  }

  public async findActiveEnrollment(
    enrollmentId: number
  ): Promise<Enrollment | null> {
    return Enrollment.findOne({
      where: {
        id: enrollmentId,
        status: "active",
      },
    });
  }

  public async create(
    data: CreateCertificateDto
  ): Promise<Certificate> {
    return Certificate.create({
      enrollment_id: data.enrollment_id,
      name: data.name,
      description: data.description ?? null,
      isActive: data.isActive ?? true,
    } as CreationAttributes<Certificate>);
  }

  public async update(
    certificate: Certificate,
    data: UpdateCertificateDto
  ): Promise<Certificate> {
    await certificate.update({
      enrollment_id: data.enrollment_id,
      name: data.name,
      description: data.description ?? null,
    });

    return certificate;
  }

  public async patch(
    certificate: Certificate,
    data: PatchCertificateDto
  ): Promise<Certificate> {
    await certificate.update({
      ...(data.enrollment_id !== undefined && {
        enrollment_id: data.enrollment_id,
      }),
      ...(data.name !== undefined && {
        name: data.name,
      }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
    });

    return certificate;
  }

  public async delete(certificate: Certificate): Promise<void> {
    await certificate.destroy();
  }

  public async deactivate(
    certificate: Certificate
  ): Promise<Certificate> {
    await certificate.update({
      isActive: false,
    });

    return certificate;
  }
}
