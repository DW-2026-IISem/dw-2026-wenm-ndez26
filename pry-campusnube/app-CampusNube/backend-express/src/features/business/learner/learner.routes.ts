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

          // create
    app
      .route("/api/aprendices")
      .post(this.learnerController.create.bind(this.learnerController));

          // update (PUT / PATCH)
    app
      .route("/api/aprendices/:id")
      .put(this.learnerController.updatePut.bind(this.learnerController))
      .patch(this.learnerController.updatePatch.bind(this.learnerController));
     
      // delete físico
    app
      .route("/api/aprendices/:id")
      .delete(this.learnerController.deletePhysical.bind(this.learnerController));

    // delete lógico
    app
      .route("/api/aprendices/:id/deactivate")
      .patch(this.learnerController.deleteLogical.bind(this.learnerController));
  }
}
