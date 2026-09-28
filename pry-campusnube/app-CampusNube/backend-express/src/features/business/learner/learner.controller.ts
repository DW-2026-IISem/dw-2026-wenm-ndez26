import { Request, Response } from "express";
import { Learner } from "./learner.model";

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
  // (rellenar en los siguientes ISS)

  // ================== UPDATE ==================
  // (rellenar en los siguientes ISS)

  // ================== DELETE ==================
  // (rellenar en los siguientes ISS)
}