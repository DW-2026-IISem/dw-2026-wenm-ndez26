import { Request, Response } from "express";
import { Enrollment } from "./enrollment.model";

export class EnrollmentController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const enrollments = await Enrollment.findAll({
        order: [["id", "ASC"]],
      });

      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener las inscripciones",
        error,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await Enrollment.findByPk(
        Number(req.params.id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "Inscripción no encontrada",
        });
        return;
      }

      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener la inscripción",
        error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        learner_id,
        course_id,
        enrollment_date,
        status,
      } = req.body;

      if (!learner_id || !course_id) {
        res.status(400).json({
          message: "learner_id y course_id son obligatorios",
        });
        return;
      }

      const enrollment = await Enrollment.create({
        learner_id,
        course_id,
        enrollment_date: enrollment_date || new Date(),
        status: status || "active",
      });

      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear la inscripción",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await Enrollment.findByPk(
        Number(req.params.id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "Inscripción no encontrada",
        });
        return;
      }

      const {
        learner_id,
        course_id,
        enrollment_date,
        status,
      } = req.body;

      await enrollment.update({
        learner_id,
        course_id,
        enrollment_date,
        status,
      });

      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar la inscripción",
        error,
      });
    }
  }

  async patch(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await Enrollment.findByPk(
        Number(req.params.id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "Inscripción no encontrada",
        });
        return;
      }

      await enrollment.update(req.body);

      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar parcialmente la inscripción",
        error,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await Enrollment.findByPk(
        Number(req.params.id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "Inscripción no encontrada",
        });
        return;
      }

      await enrollment.destroy();

      res.status(200).json({
        message: "Inscripción eliminada correctamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar la inscripción",
        error,
      });
    }
  }

  async deactivate(req: Request, res: Response): Promise<void> {
    try {
      const enrollment = await Enrollment.findByPk(
        Number(req.params.id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "Inscripción no encontrada",
        });
        return;
      }

      await enrollment.update({
        status: "inactive",
      });

      res.status(200).json({
        message: "Inscripción desactivada correctamente",
        enrollment,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al desactivar la inscripción",
        error,
      });
    }
  }
}