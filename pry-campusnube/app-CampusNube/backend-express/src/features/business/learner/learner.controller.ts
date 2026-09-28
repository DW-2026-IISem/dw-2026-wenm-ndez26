import { Request, Response } from "express";
import { Learner, LearnerI } from "./learner.model";

function paramId(req: Request): number {
  const raw = req.params.id;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return Number(value);
}

export class LearnerController {
  // ================== READ ==================
  // (rellenar en los siguientes ISS)

  // ================== CREATE ==================
  // (rellenar en los siguientes ISS)

  // ================== UPDATE ==================
  // (rellenar en los siguientes ISS)

  // ================== DELETE ==================
  // (rellenar en los siguientes ISS)
}
