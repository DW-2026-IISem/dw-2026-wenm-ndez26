import { Request, Response } from "express";
import { Module } from "./module.model";
import { Course } from "../course/course.model";

export class ModuleController {
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const modules = await Module.findAll();

      return res.status(200).json(modules);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener los módulos",
        error,
      });
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const module = await Module.findByPk(id);

      if (!module) {
        return res.status(404).json({
          message: "Módulo no encontrado",
        });
      }

      return res.status(200).json(module);
    } catch (error) {
      return res.status(500).json({
        message: "Error al obtener el módulo",
        error,
      });
    }
  }

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

      const module = await Module.create({
        course_id: Number(course_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(201).json(module);
    } catch (error) {
      return res.status(500).json({
        message: "Error al crear el módulo",
        error,
      });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const module = await Module.findByPk(id);

      if (!module) {
        return res.status(404).json({
          message: "Módulo no encontrado",
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

      await module.update({
        course_id: Number(course_id),
        name,
        description: description ?? null,
        isActive: isActive ?? true,
      });

      return res.status(200).json(module);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar el módulo",
        error,
      });
    }
  }

  async patch(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const module = await Module.findByPk(id);

      if (!module) {
        return res.status(404).json({
          message: "Módulo no encontrado",
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

      await module.update({
        ...(course_id !== undefined && {
          course_id: Number(course_id),
        }),
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
      });

      return res.status(200).json(module);
    } catch (error) {
      return res.status(500).json({
        message: "Error al actualizar parcialmente el módulo",
        error,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const module = await Module.findByPk(id);

      if (!module) {
        return res.status(404).json({
          message: "Módulo no encontrado",
        });
      }

      await module.destroy();

      return res.status(200).json({
        message: "Módulo eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al eliminar el módulo",
        error,
      });
    }
  }

  async deactivate(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const module = await Module.findByPk(id);

      if (!module) {
        return res.status(404).json({
          message: "Módulo no encontrado",
        });
      }

      await module.update({
        isActive: false,
      });

      return res.status(200).json({
        message: "Módulo desactivado correctamente",
        module,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error al desactivar el módulo",
        error,
      });
    }
  }
}
