import { Application } from "express";
import { LearnerController } from "./learner.controller";
import { authenticate, authorize } from "../../auth/access";

export class LearnerRoutes {
  public learnerController: LearnerController = new LearnerController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/aprendices")
      .get(
        authenticate,
        authorize,
        this.learnerController.getAll.bind(this.learnerController)
      );

    // getOne
    app
      .route("/api/aprendices/:id")
      .get(
        authenticate,
        authorize,
        this.learnerController.getOne.bind(this.learnerController)
      );

    // create
    app
      .route("/api/aprendices")
      .post(
        authenticate,
        authorize,
        this.learnerController.create.bind(this.learnerController)
      );

    // update PUT / PATCH
    app
      .route("/api/aprendices/:id")
      .put(
        authenticate,
        authorize,
        this.learnerController.updatePut.bind(this.learnerController)
      )
      .patch(
        authenticate,
        authorize,
        this.learnerController.updatePatch.bind(this.learnerController)
      );

    // delete físico
    app
      .route("/api/aprendices/:id")
      .delete(
        authenticate,
        authorize,
        this.learnerController.deletePhysical.bind(this.learnerController)
      );

    // delete lógico
    app
      .route("/api/aprendices/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.learnerController.deleteLogical.bind(this.learnerController)
      );
  }
}
