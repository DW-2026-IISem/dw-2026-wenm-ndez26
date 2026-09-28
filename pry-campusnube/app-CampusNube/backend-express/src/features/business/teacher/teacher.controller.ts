import { Request, Response } from "express";
import { Teacher, TeacherI } from "./teacher.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class TeacherController {
  // ================== READ ==================

  public async getAll(req: Request, res: Response) {
    try {
      const teachers = await Teacher.findAll({
        where: { isActive: true },
      });

      res.status(200).json({ teachers });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching teachers",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        res.status(404).json({
          error: "Teacher not found",
        });
        return;
      }

      res.status(200).json({ teacher });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching teacher",
        detail: String(error),
      });
    }
  }

  // ================== CREATE ==================

  public async create(req: Request, res: Response) {
    try {
      const body = req.body as TeacherI;

      const teacher = await Teacher.create({
        name: body.name,
        description: body.description ?? null,
        isActive: body.isActive ?? true,
      });

      res.status(201).json({ teacher });
    } catch (error) {
      res.status(500).json({
        error: "Error creating teacher",
        detail: String(error),
      });
    }
  }

  // ================== UPDATE ==================

  public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as TeacherI;

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        res.status(404).json({
          error: "Teacher not found",
        });
        return;
      }

      await teacher.update({
        name: body.name,
        description: body.description ?? null,
        isActive: body.isActive ?? teacher.isActive,
      });

      res.status(200).json({ teacher });
    } catch (error) {
      res.status(500).json({
        error: "Error updating teacher (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<TeacherI>;

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        res.status(404).json({
          error: "Teacher not found",
        });
        return;
      }

      await teacher.update(body);

      res.status(200).json({ teacher });
    } catch (error) {
      res.status(500).json({
        error: "Error updating teacher (PATCH)",
        detail: String(error),
      });
    }
  }

  // ================== DELETE ==================

  /** Eliminación física */
  public async deletePhysical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        res.status(404).json({
          error: "Teacher not found",
        });
        return;
      }

      await teacher.destroy();

      res.status(200).json({
        message: "Teacher permanently deleted",
        id,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deleting teacher",
        detail: String(error),
      });
    }
  }

  /** Eliminación lógica → isActive = false */
  public async deleteLogical(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        res.status(404).json({
          error: "Teacher not found",
        });
        return;
      }

      await teacher.update({
        isActive: false,
      });

      res.status(200).json({
        message: "Teacher deactivated (logical delete)",
        teacher,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error deactivating teacher",
        detail: String(error),
      });
    }
  }
}
