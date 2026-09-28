import { Application } from "express";
import { LearnerController } from "./learner.controller";

export class LearnerRoutes {
  public learnerController: LearnerController = new LearnerController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // (rellenar en los siguientes ISS)
  }
}
