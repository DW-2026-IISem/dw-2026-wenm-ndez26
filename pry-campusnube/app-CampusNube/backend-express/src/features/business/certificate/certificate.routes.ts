import { Application } from "express";
import { CertificateController } from "./certificate.controller";
import { authenticate, authorize } from "../../auth/access";

export class CertificateRoutes {
  public certificateController: CertificateController =
    new CertificateController();

  public routes(app: Application): void {
    app
      .route("/api/certificates")
      .get(
        authenticate,
        authorize,
        this.certificateController.getAll.bind(
          this.certificateController
        )
      )
      .post(
        authenticate,
        authorize,
        this.certificateController.create.bind(
          this.certificateController
        )
      );

    app
      .route("/api/certificates/:id")
      .get(
        authenticate,
        authorize,
        this.certificateController.getOne.bind(
          this.certificateController
        )
      )
      .put(
        authenticate,
        authorize,
        this.certificateController.update.bind(
          this.certificateController
        )
      )
      .patch(
        authenticate,
        authorize,
        this.certificateController.patch.bind(
          this.certificateController
        )
      )
      .delete(
        authenticate,
        authorize,
        this.certificateController.delete.bind(
          this.certificateController
        )
      );
  }
}
