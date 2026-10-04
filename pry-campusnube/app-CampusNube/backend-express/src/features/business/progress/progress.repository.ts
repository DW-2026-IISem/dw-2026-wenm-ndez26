import { CreationAttributes } from "sequelize";
import { Enrollment } from "../enrollment/enrollment.model";
import { Progress } from "./progress.model";
import {
  CreateProgressDto,
  UpdateProgressDto,
} from "./dto";

/**
 * Repository de Progress.
 *
 * Única capa responsable de acceder a Sequelize.
 */
export class ProgressRepository {
  // ================== READ ==================

  public async findAll(): Promise<Progress[]> {
    return Progress.findAll({
      where: {
        isActive: true,
      },
    });
  }

  public async findById(
    id: number
  ): Promise<Progress | null> {
    return Progress.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  // ================== VALIDACIONES ==================

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

  // ================== CREATE ==================

  public async create(
    data: CreateProgressDto
  ): Promise<Progress> {
    return Progress.create({
      enrollment_id: data.enrollment_id,
      name: data.name,
      description: data.description ?? null,
      isActive: data.isActive ?? true,
    } as CreationAttributes<Progress>);
  }

  // ================== UPDATE ==================

  public async update(
    progress: Progress,
    data: UpdateProgressDto
  ): Promise<Progress> {
    await progress.update({
      enrollment_id: data.enrollment_id,
      name: data.name,
      description: data.description ?? null,
    });

    return progress;
  }

  public async patch(
    progress: Progress,
    data: Partial<UpdateProgressDto>
  ): Promise<Progress> {
    await progress.update({
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

    return progress;
  }

  // ================== DELETE ==================

  public async delete(
    progress: Progress
  ): Promise<void> {
    await progress.destroy();
  }

  public async deactivate(
    progress: Progress
  ): Promise<Progress> {
    await progress.update({
      isActive: false,
    });

    return progress;
  }
}
