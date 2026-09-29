import { Application } from "express";
import { EnrollmentController } from "./enrollment.controller";

export class EnrollmentRoutes {
  public enrollmentController: EnrollmentController =
    new EnrollmentController();

  public routes(app: Application): void {
    app
      .route("/api/inscripciones")
      .get(
        this.enrollmentController.getAll.bind(
          this.enrollmentController
        )
      )
      .post(
        this.enrollmentController.create.bind(
          this.enrollmentController
        )
      );

    app
      .route("/api/inscripciones/:id")
      .get(
        this.enrollmentController.getOne.bind(
          this.enrollmentController
        )
      )
      .put(
        this.enrollmentController.update.bind(
          this.enrollmentController
        )
      )
      .patch(
        this.enrollmentController.patch.bind(
          this.enrollmentController
        )
      )
      .delete(
        this.enrollmentController.delete.bind(
          this.enrollmentController
        )
      );

    app
      .route("/api/inscripciones/:id/deactivate")
      .patch(
        this.enrollmentController.deactivate.bind(
          this.enrollmentController
        )
      );
  }
}