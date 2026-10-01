import { Application } from "express";
import { ProgressController } from "./progress.controller";

export class ProgressRoutes {
  public progressController: ProgressController =
    new ProgressController();

  public routes(app: Application): void {
    app
      .route("/api/progress")
      .get(
        this.progressController.getAll.bind(
          this.progressController
        )
      )
      .post(
        this.progressController.create.bind(
          this.progressController
        )
      );

    app
      .route("/api/progress/:id")
      .get(
        this.progressController.getOne.bind(
          this.progressController
        )
      )
      .put(
        this.progressController.update.bind(
          this.progressController
        )
      )
      .patch(
        this.progressController.patch.bind(
          this.progressController
        )
      )
      .delete(
        this.progressController.delete.bind(
          this.progressController
        )
      );
  }
}
