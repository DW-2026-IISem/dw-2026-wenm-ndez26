import { Application } from "express";
import { ModuleController } from "./module.controller";

export class ModuleRoutes {
  public moduleController: ModuleController =
    new ModuleController();

  public routes(app: Application): void {
    app
      .route("/api/modulos")
      .get(
        this.moduleController.getAll.bind(this.moduleController)
      )
      .post(
        this.moduleController.create.bind(this.moduleController)
      );

    app
      .route("/api/modulos/:id")
      .get(
        this.moduleController.getOne.bind(this.moduleController)
      )
      .put(
        this.moduleController.update.bind(this.moduleController)
      )
      .patch(
        this.moduleController.patch.bind(this.moduleController)
      )
      .delete(
        this.moduleController.delete.bind(this.moduleController)
      );

    app
      .route("/api/modulos/:id/deactivate")
      .patch(
        this.moduleController.deactivate.bind(
          this.moduleController
        )
      );
  }
}
