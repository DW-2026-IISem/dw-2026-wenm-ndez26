import { Application } from "express";
import { authenticate, authorize } from "../../auth/access";
import { MyEnrollmentController } from "./my-enrollment.controller";

export class MyEnrollmentRoutes {
  public controller: MyEnrollmentController = new MyEnrollmentController();

  public routes(app: Application): void {
    app
      .route("/api/mis-inscripciones")
      .get(authenticate, authorize, this.controller.list.bind(this.controller))
      .post(authenticate, authorize, this.controller.enroll.bind(this.controller));
  }
}
