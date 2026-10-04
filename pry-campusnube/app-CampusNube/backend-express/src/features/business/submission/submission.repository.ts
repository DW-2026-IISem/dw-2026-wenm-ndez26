import { CreationAttributes, Op } from "sequelize";
import { Lesson } from "../lesson/lesson.model";
import { Enrollment } from "../enrollment/enrollment.model";
import { Submission } from "./submission.model";
import {
  CreateSubmissionDto,
  UpdateSubmissionDto,
} from "./dto";

/**
 * Repository de Submission.
 *
 * Única capa responsable de acceder a Sequelize.
 */
export class SubmissionRepository {
  // ================== READ ==================

  public async findAll(): Promise<Submission[]> {
    return Submission.findAll({
      where: {
        estado: {
          [Op.ne]: "inactivo",
        },
      },
    });
  }

  public async findById(
    id: number
  ): Promise<Submission | null> {
    return Submission.findOne({
      where: {
        id,
        estado: {
          [Op.ne]: "inactivo",
        },
      },
    });
  }

  // ================== VALIDACIONES ==================

  public async findActiveLesson(
    lessonId: number
  ): Promise<Lesson | null> {
    return Lesson.findOne({
      where: {
        id: lessonId,
        isActive: true,
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

  // ================== CREATE ==================

  public async create(
    data: CreateSubmissionDto
  ): Promise<Submission> {
    return Submission.create({
      referencia_id: data.referencia_id,
      lesson_id: data.lesson_id,
      enrollment_id: data.enrollment_id,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin ?? null,
      total: data.total ?? null,
      estado: data.estado,
      observaciones: data.observaciones ?? null,
    } as CreationAttributes<Submission>);
  }

  // ================== UPDATE ==================

  public async update(
    submission: Submission,
    data: UpdateSubmissionDto
  ): Promise<Submission> {
    await submission.update({
      referencia_id: data.referencia_id,
      lesson_id: data.lesson_id,
      enrollment_id: data.enrollment_id,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin ?? null,
      total: data.total ?? null,
      observaciones: data.observaciones ?? null,
    });

    return submission;
  }

  public async patch(
    submission: Submission,
    data: Partial<UpdateSubmissionDto>
  ): Promise<Submission> {
    await submission.update({
      ...(data.referencia_id !== undefined && {
        referencia_id: data.referencia_id,
      }),
      ...(data.lesson_id !== undefined && {
        lesson_id: data.lesson_id,
      }),
      ...(data.enrollment_id !== undefined && {
        enrollment_id: data.enrollment_id,
      }),
      ...(data.fecha_inicio !== undefined && {
        fecha_inicio: data.fecha_inicio,
      }),
      ...(data.fecha_fin !== undefined && {
        fecha_fin: data.fecha_fin,
      }),
      ...(data.total !== undefined && {
        total: data.total,
      }),
      ...(data.observaciones !== undefined && {
        observaciones: data.observaciones,
      }),
    });

    return submission;
  }

  // ================== DELETE ==================

  public async delete(
    submission: Submission
  ): Promise<void> {
    await submission.destroy();
  }

  public async deactivate(
    submission: Submission
  ): Promise<Submission> {
    await submission.update({
      estado: "inactivo",
    });

    return submission;
  }
}