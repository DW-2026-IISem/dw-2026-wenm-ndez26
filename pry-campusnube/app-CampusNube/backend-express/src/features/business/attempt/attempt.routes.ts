import { Application } from "express";
import { AttemptController } from "./attempt.controller";
import { authenticate, authorize } from "../../auth/access";

export class AttemptRoutes {
  public attemptController: AttemptController =
    new AttemptController();

  public routes(app: Application): void {
    app
      .route("/api/intentos")
      .get(
        authenticate,
        authorize,
        this.attemptController.getAll.bind(this.attemptController)
      )
      .post(
        authenticate,
        authorize,
        this.attemptController.create.bind(this.attemptController)
      );

    app
      .route("/api/intentos/:id")
      .get(
        authenticate,
        authorize,
        this.attemptController.getOne.bind(this.attemptController)
      )
      .put(
        authenticate,
        authorize,
        this.attemptController.update.bind(this.attemptController)
      )
      .patch(
        authenticate,
        authorize,
        this.attemptController.patch.bind(this.attemptController)
      )
      .delete(
        authenticate,
        authorize,
        this.attemptController.delete.bind(this.attemptController)
      );

    app
      .route("/api/intentos/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.attemptController.deactivate.bind(
          this.attemptController
        )
      );
  }
}
