import { Request, Response } from "express";
import { Learner, LearnerI } from "./learner.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class LearnerController {
  // ================== READ ==================

  public async getAll(req: Request, res: Response) {
    try {
      const learners = await Learner.findAll({
        where: { status: "active" },
        attributes: { exclude: ["password"] },
      });

      res.status(200).json({ learners });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching learners",
        detail: String(error),
      });
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const id = paramId(req);

      const learner = await Learner.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!learner) {
        res.status(404).json({
          error: "Learner not found",
        });
        return;
      }

      res.status(200).json({ learner });
    } catch (error) {
      res.status(500).json({
        error: "Error fetching learner",
        detail: String(error),
      });
    }
  }

  // ================== CREATE ==================
    public async create(req: Request, res: Response) {
    try {
      const body = req.body as LearnerI;

      const learner = await Learner.create({
        name: body.name,
        description: body.description,
        password: body.password,
        status: body.status ?? "active",
      });

      const { password, ...safe } = learner.toJSON() as LearnerI & {
        password?: string;
      };

      res.status(201).json({ learner: safe });
    } catch (error) {
      res.status(500).json({
        error: "Error creating learner",
        detail: String(error),
      });
    }
  }


  // ================== UPDATE ==================
    public async updatePut(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as LearnerI;

      const learner = await Learner.findByPk(id);

      if (!learner) {
        res.status(404).json({ error: "Learner not found" });
        return;
      }

      await learner.update({
        name: body.name,
        description: body.description,
        password: body.password ?? learner.password,
        status: body.status ?? learner.status,
      });

      const { password, ...safe } = learner.toJSON() as LearnerI & {
        password?: string;
      };

      res.status(200).json({ learner: safe });
    } catch (error) {
      res.status(500).json({
        error: "Error updating learner (PUT)",
        detail: String(error),
      });
    }
  }

  public async updatePatch(req: Request, res: Response) {
    try {
      const id = paramId(req);
      const body = req.body as Partial<LearnerI>;

      const learner = await Learner.findByPk(id);

      if (!learner) {
        res.status(404).json({ error: "Learner not found" });
        return;
      }

      await learner.update(body);

      const { password, ...safe } = learner.toJSON() as LearnerI & {
        password?: string;
      };

      res.status(200).json({ learner: safe });
    } catch (error) {
      res.status(500).json({
        error: "Error updating learner (PATCH)",
        detail: String(error),
      });
    }
  }

  // ================== DELETE ==================
  // (rellenar en los siguientes ISS)
}