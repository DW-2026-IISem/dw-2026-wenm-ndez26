import { Application } from "express";
import { SubmissionController } from "./submission.controller";

export class SubmissionRoutes {
  public submissionController: SubmissionController =
    new SubmissionController();

  public routes(app: Application): void {
    app
      .route("/api/entregas")
      .get(
        this.submissionController.getAll.bind(
          this.submissionController
        )
      )
      .post(
        this.submissionController.create.bind(
          this.submissionController
        )
      );

    app
      .route("/api/entregas/:id")
      .get(
        this.submissionController.getOne.bind(
          this.submissionController
        )
      )
      .put(
        this.submissionController.update.bind(
          this.submissionController
        )
      )
      .patch(
        this.submissionController.patch.bind(
          this.submissionController
        )
      )
      .delete(
        this.submissionController.delete.bind(
          this.submissionController
        )
      );

    app
      .route("/api/entregas/:id/deactivate")
      .patch(
        this.submissionController.deactivate.bind(
          this.submissionController
        )
      );
  }
}