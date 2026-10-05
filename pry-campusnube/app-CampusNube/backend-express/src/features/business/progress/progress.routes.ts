import { Application } from "express";
import { ProgressController } from "./progress.controller";
import { authenticate, authorize } from "../../auth/access";

export class ProgressRoutes {
  public progressController: ProgressController =
    new ProgressController();

  public routes(app: Application): void {
    app
      .route("/api/progress")
      .get(
        authenticate,
        authorize,
        this.progressController.getAll.bind(this.progressController)
      )
      .post(
        authenticate,
        authorize,
        this.progressController.create.bind(this.progressController)
      );

    app
      .route("/api/progress/:id")
      .get(
        authenticate,
        authorize,
        this.progressController.getOne.bind(this.progressController)
      )
      .put(
        authenticate,
        authorize,
        this.progressController.update.bind(this.progressController)
      )
      .patch(
        authenticate,
        authorize,
        this.progressController.patch.bind(this.progressController)
      )
      .delete(
        authenticate,
        authorize,
        this.progressController.delete.bind(this.progressController)
      );
  }
}
