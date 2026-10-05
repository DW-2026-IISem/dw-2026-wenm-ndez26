import { Application } from "express";
import { SessionController } from "./session.controller";
import { authenticate } from "../access";

export class SessionRoutes {
  public sessionController: SessionController =
    new SessionController();

  public routes(app: Application): void {
    app
      .route("/api/sesion/login")
      .post(
        this.sessionController.login.bind(
          this.sessionController
        )
      );

    app
      .route("/api/sesion/refresh")
      .post(
        this.sessionController.refresh.bind(
          this.sessionController
        )
      );

    app
      .route("/api/sesion/logout")
      .post(
        this.sessionController.logout.bind(
          this.sessionController
        )
      );

    app
      .route("/api/sesion/perfil")
      .get(
        authenticate,
        this.sessionController.profile.bind(
          this.sessionController
        )
      );

    app
      .route("/api/permisos")
      .get(
        authenticate,
        this.sessionController.myPermissions.bind(
          this.sessionController
        )
      );
  }
}
