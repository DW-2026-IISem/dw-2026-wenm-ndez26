import { Application } from "express";
import { EnrollmentController } from "./enrollment.controller";
import { authenticate, authorize } from "../../auth/access";

export class EnrollmentRoutes {
  public enrollmentController: EnrollmentController =
    new EnrollmentController();

  public routes(app: Application): void {
    app
      .route("/api/inscripciones")
      .get(
        authenticate,
        authorize,
        this.enrollmentController.getAll.bind(this.enrollmentController)
      )
      .post(
        authenticate,
        authorize,
        this.enrollmentController.create.bind(this.enrollmentController)
      );

    app
      .route("/api/inscripciones/:id")
      .get(
        authenticate,
        authorize,
        this.enrollmentController.getOne.bind(this.enrollmentController)
      )
      .put(
        authenticate,
        authorize,
        this.enrollmentController.update.bind(this.enrollmentController)
      )
      .patch(
        authenticate,
        authorize,
        this.enrollmentController.patch.bind(this.enrollmentController)
      )
      .delete(
        authenticate,
        authorize,
        this.enrollmentController.delete.bind(this.enrollmentController)
      );

    app
      .route("/api/inscripciones/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.enrollmentController.deactivate.bind(this.enrollmentController)
      );
  }
}
