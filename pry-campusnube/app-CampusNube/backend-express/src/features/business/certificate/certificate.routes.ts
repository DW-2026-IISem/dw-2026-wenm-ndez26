import { Application } from "express";
import { CertificateController } from "./certificate.controller";

export class CertificateRoutes {
  public certificateController: CertificateController =
    new CertificateController();

  public routes(app: Application): void {
    app
      .route("/api/certificates")
      .get(
        this.certificateController.getAll.bind(
          this.certificateController
        )
      )
      .post(
        this.certificateController.create.bind(
          this.certificateController
        )
      );

    app
      .route("/api/certificates/:id")
      .get(
        this.certificateController.getOne.bind(
          this.certificateController
        )
      )
      .put(
        this.certificateController.update.bind(
          this.certificateController
        )
      )
      .patch(
        this.certificateController.patch.bind(
          this.certificateController
        )
      )
      .delete(
        this.certificateController.delete.bind(
          this.certificateController
        )
      );
  }
}


