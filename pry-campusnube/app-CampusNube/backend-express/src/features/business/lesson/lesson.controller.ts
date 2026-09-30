import { Request, Response } from "express";
import { Lesson } from "./lesson.model";
import { Module } from "../module/module.model";

export class LessonController {
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const lessons = await Lesson.findAll();

      return res.status(200).json(lessons);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener las lecciones",
        error,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const lesson = await Lesson.findByPk(id);

      if (!lesson) {
        return res.status(404).json({
          message: "Lección no encontrada",
        });
      }

      return res.status(200).json(lesson);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener la lección",
        error,
      });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { module_id, name, description, isActive } = req.body;

      if (!module_id || !name) {
        return res.status(400).json({
          message: "module_id y name son obligatorios",
        });
      }

      const module = await Module.findOne({
        where: {
          id: Number(module_id),
          isActive: true,
        },
      });

      if (!module) {
        return res.status(400).json({
          message: "El módulo no existe o no está activo",
        });
      }

      const lesson = await Lesson.create({
        module_id: Number(module_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(201).json(lesson);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear la lección",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const lesson = await Lesson.findByPk(id);

      if (!lesson) {
        return res.status(404).json({
          message: "Lección no encontrada",
        });
      }

      const { module_id, name, description, isActive } = req.body;

      if (!module_id || !name) {
        return res.status(400).json({
          message: "module_id y name son obligatorios",
        });
      }

      const module = await Module.findOne({
        where: {
          id: Number(module_id),
          isActive: true,
        },
      });

      if (!module) {
        return res.status(400).json({
          message: "El módulo no existe o no está activo",
        });
      }

      await lesson.update({
        module_id: Number(module_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(200).json(lesson);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar la lección",
        error,
      });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const lesson = await Lesson.findByPk(id);

      if (!lesson) {
        return res.status(404).json({
          message: "Lección no encontrada",
        });
      }

      const { module_id, name, description, isActive } = req.body;

      if (module_id !== undefined) {
        const module = await Module.findOne({
          where: {
            id: Number(module_id),
            isActive: true,
          },
        });

        if (!module) {
          return res.status(400).json({
            message: "El módulo no existe o no está activo",
          });
        }
      }

      await lesson.update({
        ...(module_id !== undefined && {
          module_id: Number(module_id),
        }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      });

      return res.status(200).json(lesson);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar parcialmente la lección",
        error,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const lesson = await Lesson.findByPk(id);

      if (!lesson) {
        return res.status(404).json({
          message: "Lección no encontrada",
        });
      }

      await lesson.destroy();

      return res.status(200).json({
        message: "Lección eliminada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar la lección",
        error,
      });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const lesson = await Lesson.findByPk(id);

      if (!lesson) {
        return res.status(404).json({
          message: "Lección no encontrada",
        });
      }

      await lesson.update({
        isActive: false,
      });

      return res.status(200).json({
        message: "Lección desactivada correctamente",
        lesson,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al desactivar la lección",
        error,
      });
    }
  }
}
