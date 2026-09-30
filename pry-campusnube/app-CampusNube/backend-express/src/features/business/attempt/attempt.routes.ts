import { Application } from "express";
import { AttemptController } from "./attempt.controller";

export class AttemptRoutes {
  public attemptController: AttemptController =
    new AttemptController();

  public routes(app: Application): void {
    app
      .route("/api/intentos")
      .get(
        this.attemptController.getAll.bind(this.attemptController)
      )
      .post(
        this.attemptController.create.bind(this.attemptController)
      );

    app
      .route("/api/intentos/:id")
      .get(
        this.attemptController.getOne.bind(this.attemptController)
      )
      .put(
        this.attemptController.update.bind(this.attemptController)
      )
      .patch(
        this.attemptController.patch.bind(this.attemptController)
      )
      .delete(
        this.attemptController.delete.bind(this.attemptController)
      );

    app
      .route("/api/intentos/:id/deactivate")
      .patch(
        this.attemptController.deactivate.bind(
          this.attemptController
        )
      );
  }
}
