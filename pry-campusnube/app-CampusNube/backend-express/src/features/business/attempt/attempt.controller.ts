import { Request, Response } from "express";
import { Attempt } from "./attempt.model";
import { Enrollment } from "../enrollment/enrollment.model";

export class AttemptController {
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const attempts = await Attempt.findAll();

      return res.status(200).json(attempts);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los intentos",
        error,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const attempt = await Attempt.findByPk(id);

      if (!attempt) {
        return res.status(404).json({
          message: "Intento no encontrado",
        });
      }

      return res.status(200).json(attempt);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el intento",
        error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { enrollment_id, name, description, isActive } = req.body;

      if (!enrollment_id || !name) {
        return res.status(400).json({
          message: "enrollment_id y name son obligatorios",
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

      const attempt = await Attempt.create({
        enrollment_id: Number(enrollment_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(201).json(attempt);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el intento",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const attempt = await Attempt.findByPk(id);

      if (!attempt) {
        return res.status(404).json({
          message: "Intento no encontrado",
        });
      }

      const { enrollment_id, name, description, isActive } = req.body;

      if (!enrollment_id || !name) {
        return res.status(400).json({
          message: "enrollment_id y name son obligatorios",
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

      await attempt.update({
        enrollment_id: Number(enrollment_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(200).json(attempt);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar el intento",
        error,
      });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const attempt = await Attempt.findByPk(id);

      if (!attempt) {
        return res.status(404).json({
          message: "Intento no encontrado",
        });
      }

      const { enrollment_id, name, description, isActive } = req.body;

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

      await attempt.update({
        ...(enrollment_id !== undefined && {
          enrollment_id: Number(enrollment_id),
        }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      });

      return res.status(200).json(attempt);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar parcialmente el intento",
        error,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const attempt = await Attempt.findByPk(id);

      if (!attempt) {
        return res.status(404).json({
          message: "Intento no encontrado",
        });
      }

      await attempt.destroy();

      return res.status(200).json({
        message: "Intento eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar el intento",
        error,
      });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const attempt = await Attempt.findByPk(id);

      if (!attempt) {
        return res.status(404).json({
          message: "Intento no encontrado",
        });
      }

      await attempt.update({
        isActive: false,
      });

      return res.status(200).json({
        message: "Intento desactivado correctamente",
        attempt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al desactivar el intento",
        error,
      });
    }
  }
}
