import { Request, Response } from "express";
import { Course, CourseI } from "./course.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class CourseController {
  public async getAll(req: Request, res: Response) {
    try {
      const courses = await Course.findAll({
        where: { isActive: true },
      });

      res.status(200).json({ courses });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching courses",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          error: "Course not found",
        });
        return;
      }

      res.status(200).json({ course });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching course",
        detail: String(error),
      });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as CourseI;

      const course = await Course.create({
        name: body.name,
        description: body.description ?? null,
        isActive: body.isActive ?? true,
      });

      res.status(201).json({ course });
    } catch (error) {
      res.status(500).json({
        error: "Error creating course",
        detail: String(error),
      });
    }
  }

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as CourseI;

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          error: "Course not found",
        });
        return;
      }

      await course.update({
        name: body.name,
        description: body.description ?? null,
        isActive: body.isActive ?? course.isActive,
      });

      res.status(200).json({ course });
    } catch (error) {
      res.status(500).json({
        error: "Error updating course (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<CourseI>;

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          error: "Course not found",
        });
        return;
      }

      await course.update(body);

      res.status(200).json({ course });
    } catch (error) {
      res.status(500).json({
        error: "Error updating course (PATCH)",
        detail: String(error),
      });
    }
  }

  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          error: "Course not found",
        });
        return;
      }

      await course.destroy();

      res.status(200).json({
        message: "Course permanently deleted",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deleting course",
        detail: String(error),
      });
    }
  }

  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          error: "Course not found",
        });
        return;
      }

      await course.update({
        isActive: false,
      });

      res.status(200).json({
        message: "Course deactivated (logical delete)",
        course,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deactivating course",
        detail: String(error),
      });
    }
  }
}
