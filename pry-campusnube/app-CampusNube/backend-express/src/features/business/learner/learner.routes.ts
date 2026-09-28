import { Application } from "express";
import { LearnerController } from "./learner.controller";

export class LearnerRoutes {
  public learnerController: LearnerController = new LearnerController();

  public routes(app: Application): void {
        // ================== RUTAS SIN AUTENTICACIÓN ==================

    // getAll
    app
      .route("/api/aprendices")
      .get(this.learnerController.getAll.bind(this.learnerController));

    // getOne
    app
      .route("/api/aprendices/:id")
      .get(this.learnerController.getOne.bind(this.learnerController));
  }
}
