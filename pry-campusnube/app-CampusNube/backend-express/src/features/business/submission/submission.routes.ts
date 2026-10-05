import { Application } from "express";
import { SubmissionController } from "./submission.controller";
import { authenticate, authorize } from "../../auth/access";

export class SubmissionRoutes {
  public submissionController: SubmissionController =
    new SubmissionController();

  public routes(app: Application): void {
    app
      .route("/api/entregas")
      .get(
        authenticate,
        authorize,
        this.submissionController.getAll.bind(this.submissionController)
      )
      .post(
        authenticate,
        authorize,
        this.submissionController.create.bind(this.submissionController)
      );

    app
      .route("/api/entregas/:id")
      .get(
        authenticate,
        authorize,
        this.submissionController.getOne.bind(this.submissionController)
      )
      .put(
        authenticate,
        authorize,
        this.submissionController.update.bind(this.submissionController)
      )
      .patch(
        authenticate,
        authorize,
        this.submissionController.patch.bind(this.submissionController)
      )
      .delete(
        authenticate,
        authorize,
        this.submissionController.delete.bind(this.submissionController)
      );

    app
      .route("/api/entregas/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.submissionController.deactivate.bind(
          this.submissionController
        )
      );
  }
}
