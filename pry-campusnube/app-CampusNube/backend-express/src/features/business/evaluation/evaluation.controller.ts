import { Request, Response } from "express";
import { Evaluation } from "./evaluation.model";
import { Course } from "../course/course.model";

export class EvaluationController {
  // GET ALL
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const evaluations = await Evaluation.findAll();
      return res.status(200).json(evaluations);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener las evaluaciones",
        error,
      });
    }
  }

  // GET ONE
  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const evaluation = await Evaluation.findByPk(id);

      if (!evaluation) {
        return res.status(404).json({
          message: "Evaluación no encontrada",
        });
      }

      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener la evaluación",
        error,
      });
    }
  }

  // CREATE
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { course_id, name, description, isActive } = req.body;

      if (!course_id || !name) {
        return res.status(400).json({
          message: "course_id y name son obligatorios",
        });
      }

      const course = await Course.findOne({
        where: {
          id: Number(course_id),
          isActive: true,
        },
      });

      if (!course) {
        return res.status(400).json({
          message: "El curso no existe o no está activo",
        });
      }

      const evaluation = await Evaluation.create({
        course_id: Number(course_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(201).json(evaluation);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear la evaluación",
        error,
      });
    }
  }

  // UPDATE PUT
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const evaluation = await Evaluation.findByPk(id);

      if (!evaluation) {
        return res.status(404).json({
          message: "Evaluación no encontrada",
        });
      }

      const { course_id, name, description, isActive } = req.body;

      if (!course_id || !name) {
        return res.status(400).json({
          message: "course_id y name son obligatorios",
        });
      }

      const course = await Course.findOne({
        where: {
          id: Number(course_id),
          isActive: true,
        },
      });

      if (!course) {
        return res.status(400).json({
          message: "El curso no existe o no está activo",
        });
      }

      await evaluation.update({
        course_id: Number(course_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar la evaluación",
        error,
      });
    }
  }

  // UPDATE PATCH
  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const evaluation = await Evaluation.findByPk(id);

      if (!evaluation) {
        return res.status(404).json({
          message: "Evaluación no encontrada",
        });
      }

      const { course_id, name, description, isActive } = req.body;

      if (course_id !== undefined) {
        const course = await Course.findOne({
          where: {
            id: Number(course_id),
            isActive: true,
          },
        });

        if (!course) {
          return res.status(400).json({
            message: "El curso no existe o no está activo",
          });
        }
      }

      await evaluation.update({
        ...(course_id !== undefined && {
          course_id: Number(course_id),
        }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      });

      return res.status(200).json(evaluation);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar parcialmente la evaluación",
        error,
      });
    }
  }

  // DELETE FÍSICO
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const evaluation = await Evaluation.findByPk(id);

      if (!evaluation) {
        return res.status(404).json({
          message: "Evaluación no encontrada",
        });
      }

      await evaluation.destroy();

      return res.status(200).json({
        message: "Evaluación eliminada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar la evaluación",
        error,
      });
    }
  }

  // DELETE LÓGICO
  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const evaluation = await Evaluation.findByPk(id);

      if (!evaluation) {
        return res.status(404).json({
          message: "Evaluación no encontrada",
        });
      }

      await evaluation.update({
        isActive: false,
      });

      return res.status(200).json({
        message: "Evaluación desactivada correctamente",
        evaluation,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al desactivar la evaluación",
        error,
      });
    }
  }
}
