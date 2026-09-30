import { Request, Response } from "express";
import { Submission } from "./submission.model";
import { Lesson } from "../lesson/lesson.model";
import { Enrollment } from "../enrollment/enrollment.model";

export class SubmissionController {
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const submissions = await Submission.findAll();

      return res.status(200).json(submissions);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener las entregas",
        error,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const submission = await Submission.findByPk(id);

      if (!submission) {
        return res.status(404).json({
          message: "Entrega no encontrada",
        });
      }

      return res.status(200).json(submission);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener la entrega",
        error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        referencia_id,
        lesson_id,
        enrollment_id,
        fecha_inicio,
        fecha_fin,
        total,
        estado,
        observaciones,
      } = req.body;

      if (
        referencia_id === undefined ||
        !lesson_id ||
        !enrollment_id ||
        !fecha_inicio ||
        !estado
      ) {
        return res.status(400).json({
          message:
            "referencia_id, lesson_id, enrollment_id, fecha_inicio y estado son obligatorios",
        });
      }

      const lesson = await Lesson.findOne({
        where: {
          id: Number(lesson_id),
          isActive: true,
        },
      });

      if (!lesson) {
        return res.status(400).json({
          message: "La lección no existe o no está activa",
        });
      }

      const enrollment = await Enrollment.findOne({
        where: {
          id: Number(enrollment_id),
          status: "active",
        },
      });

      if (!enrollment) {
        return res.status(400).json({
          message: "La inscripción no existe o no está activa",
        });
      }

      const submission = await Submission.create({
        referencia_id: Number(referencia_id),
        lesson_id: Number(lesson_id),
        enrollment_id: Number(enrollment_id),
        fecha_inicio,
        fecha_fin: fecha_fin ?? null,
        total: total ?? null,
        estado,
        observaciones: observaciones ?? null,
      });

      return res.status(201).json(submission);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear la entrega",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const submission = await Submission.findByPk(id);

      if (!submission) {
        return res.status(404).json({
          message: "Entrega no encontrada",
        });
      }

      const {
        referencia_id,
        lesson_id,
        enrollment_id,
        fecha_inicio,
        fecha_fin,
        total,
        estado,
        observaciones,
      } = req.body;

      if (
        referencia_id === undefined ||
        !lesson_id ||
        !enrollment_id ||
        !fecha_inicio ||
        !estado
      ) {
        return res.status(400).json({
          message:
            "referencia_id, lesson_id, enrollment_id, fecha_inicio y estado son obligatorios",
        });
      }

      const lesson = await Lesson.findOne({
        where: {
          id: Number(lesson_id),
          isActive: true,
        },
      });

      if (!lesson) {
        return res.status(400).json({
          message: "La lección no existe o no está activa",
        });
      }

      const enrollment = await Enrollment.findOne({
        where: {
          id: Number(enrollment_id),
          status: "active",
        },
      });

      if (!enrollment) {
        return res.status(400).json({
          message: "La inscripción no existe o no está activa",
        });
      }

      await submission.update({
        referencia_id: Number(referencia_id),
        lesson_id: Number(lesson_id),
        enrollment_id: Number(enrollment_id),
        fecha_inicio,
        fecha_fin: fecha_fin ?? null,
        total: total ?? null,
        estado,
        observaciones: observaciones ?? null,
      });

      return res.status(200).json(submission);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar la entrega",
        error,
      });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const submission = await Submission.findByPk(id);

      if (!submission) {
        return res.status(404).json({
          message: "Entrega no encontrada",
        });
      }

      const {
        referencia_id,
        lesson_id,
        enrollment_id,
        fecha_inicio,
        fecha_fin,
        total,
        estado,
        observaciones,
      } = req.body;

      if (lesson_id !== undefined) {
        const lesson = await Lesson.findOne({
          where: {
            id: Number(lesson_id),
            isActive: true,
          },
        });

        if (!lesson) {
          return res.status(400).json({
            message: "La lección no existe o no está activa",
          });
        }
      }

      if (enrollment_id !== undefined) {
        const enrollment = await Enrollment.findOne({
          where: {
            id: Number(enrollment_id),
            status: "active",
          },
        });

        if (!enrollment) {
          return res.status(400).json({
            message: "La inscripción no existe o no está activa",
          });
        }
      }

      await submission.update({
        ...(referencia_id !== undefined && {
          referencia_id: Number(referencia_id),
        }),
        ...(lesson_id !== undefined && {
          lesson_id: Number(lesson_id),
        }),
        ...(enrollment_id !== undefined && {
          enrollment_id: Number(enrollment_id),
        }),
        ...(fecha_inicio !== undefined && { fecha_inicio }),
        ...(fecha_fin !== undefined && { fecha_fin }),
        ...(total !== undefined && { total }),
        ...(estado !== undefined && { estado }),
        ...(observaciones !== undefined && { observaciones }),
      });

      return res.status(200).json(submission);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar parcialmente la entrega",
        error,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const submission = await Submission.findByPk(id);

      if (!submission) {
        return res.status(404).json({
          message: "Entrega no encontrada",
        });
      }

      await submission.destroy();

      return res.status(200).json({
        message: "Entrega eliminada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar la entrega",
        error,
      });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const submission = await Submission.findByPk(id);

      if (!submission) {
        return res.status(404).json({
          message: "Entrega no encontrada",
        });
      }

      await submission.update({
        estado: "inactivo",
      });

      return res.status(200).json({
        message: "Entrega desactivada correctamente",
        submission,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al desactivar la entrega",
        error,
      });
    }
  }
}
