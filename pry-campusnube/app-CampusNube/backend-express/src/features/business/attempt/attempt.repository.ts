import { Enrollment } from "../enrollment/enrollment.model";
import { Attempt } from "./attempt.model";
import {
  CreateAttemptDto,
  UpdateAttemptDto,
} from "./dto";

export class AttemptRepository {
  async findAll(): Promise<Attempt[]> {
    return Attempt.findAll({
      where: {
        isActive: true,
      },
    });
  }

  async findById(id: number): Promise<Attempt | null> {
    return Attempt.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async findActiveEnrollment(
    enrollmentId: number
  ): Promise<Enrollment | null> {
    return Enrollment.findOne({
      where: {
        id: enrollmentId,
        status: "active",
      },
    });
  }

  async create(data: CreateAttemptDto): Promise<Attempt> {
    return Attempt.create({
      enrollment_id: data.enrollment_id,
      name: data.name,
      description: data.description ?? null,
      isActive: data.isActive ?? true,
    });
  }

  async update(
    attempt: Attempt,
    data: UpdateAttemptDto
  ): Promise<Attempt> {
    await attempt.update({
      enrollment_id: data.enrollment_id,
      name: data.name,
      description: data.description ?? null,
    });

    return attempt;
  }

  async patch(
    attempt: Attempt,
    data: Partial<UpdateAttemptDto>
  ): Promise<Attempt> {
    await attempt.update({
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

    return attempt;
  }

  async delete(attempt: Attempt): Promise<void> {
    await attempt.destroy();
  }

  async deactivate(attempt: Attempt): Promise<Attempt> {
    await attempt.update({
      isActive: false,
    });

    return attempt;
  }
}