import { Application } from "express";
import { ModuleController } from "./module.controller";
import { authenticate, authorize } from "../../auth/access";

export class ModuleRoutes {
  public moduleController: ModuleController =
    new ModuleController();

  public routes(app: Application): void {
    app
      .route("/api/modulos")
      .get(
        authenticate,
        authorize,
        this.moduleController.getAll.bind(this.moduleController)
      )
      .post(
        authenticate,
        authorize,
        this.moduleController.create.bind(this.moduleController)
      );

    app
      .route("/api/modulos/:id")
      .get(
        authenticate,
        authorize,
        this.moduleController.getOne.bind(this.moduleController)
      )
      .put(
        authenticate,
        authorize,
        this.moduleController.update.bind(this.moduleController)
      )
      .patch(
        authenticate,
        authorize,
        this.moduleController.patch.bind(this.moduleController)
      )
      .delete(
        authenticate,
        authorize,
        this.moduleController.delete.bind(this.moduleController)
      );

    app
      .route("/api/modulos/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.moduleController.deactivate.bind(this.moduleController)
      );
  }
}
