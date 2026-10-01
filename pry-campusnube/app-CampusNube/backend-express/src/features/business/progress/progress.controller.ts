import { Request, Response } from "express";
import { Progress } from "./progress.model";
import { Enrollment } from "../enrollment/enrollment.model";

export class ProgressController {

  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const progress = await Progress.findAll();
      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los progresos",
        error,
      });
    }
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    try {
      const progress = await Progress.findByPk(
        Number(req.params.id)
      );

      if (!progress) {
        res.status(404).json({
          message: "Progreso no encontrado",
        });
        return;
      }

      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el progreso",
        error,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        enrollment_id,
        name,
        description,
        isActive,
      } = req.body;

      if (!enrollment_id) {
        res.status(400).json({
          message: "El campo enrollment_id es obligatorio",
        });
        return;
      }

      if (!name) {
        res.status(400).json({
          message: "El campo name es obligatorio",
        });
        return;
      }

      const enrollment = await Enrollment.findByPk(
        Number(enrollment_id)
      );

      if (!enrollment) {
        res.status(404).json({
          message: "La inscripción indicada no existe",
        });
        return;
      }

      const progress = await Progress.create({
        enrollment_id,
        name,
        description,
        isActive:
          isActive !== undefined ? isActive : true,
      });

      res.status(201).json(progress);
    } catch (error) {
      res.status(500).json({
        message: "Error al crear el progreso",
        error,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const progress = await Progress.findByPk(
        Number(req.params.id)
      );

      if (!progress) {
        res.status(404).json({
          message: "Progreso no encontrado",
        });
        return;
      }

      const {
        enrollment_id,
        name,
        description,
        isActive,
      } = req.body;

      if (enrollment_id !== undefined) {
        const enrollment = await Enrollment.findByPk(
          Number(enrollment_id)
        );

        if (!enrollment) {
          res.status(404).json({
            message: "La inscripción indicada no existe",
          });
          return;
        }
      }

      await progress.update({
        enrollment_id,
        name,
        description,
        isActive,
      });

      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el progreso",
        error,
      });
    }
  }

  public async patch(req: Request, res: Response): Promise<void> {
    try {
      const progress = await Progress.findByPk(
        Number(req.params.id)
      );

      if (!progress) {
        res.status(404).json({
          message: "Progreso no encontrado",
        });
        return;
      }

      if (req.body.enrollment_id !== undefined) {
        const enrollment = await Enrollment.findByPk(
          Number(req.body.enrollment_id)
        );

        if (!enrollment) {
          res.status(404).json({
            message: "La inscripción indicada no existe",
          });
          return;
        }
      }

      await progress.update(req.body);

      res.status(200).json(progress);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar parcialmente el progreso",
        error,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const progress = await Progress.findByPk(
        Number(req.params.id)
      );

      if (!progress) {
        res.status(404).json({
          message: "Progreso no encontrado",
        });
        return;
      }

      await progress.destroy();

      res.status(200).json({
        message: "Progreso eliminado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el progreso",
        error,
      });
    }
  }
}
