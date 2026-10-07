import { Application } from "express";
import { TeacherController } from "./teacher.controller";
import { authenticate, authorize } from "../../auth/access";

export class TeacherRoutes {
  public teacherController: TeacherController = new TeacherController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/docentes")
      .get(
        authenticate,
        authorize,
        this.teacherController.getAll.bind(this.teacherController)
      );

    // getOne
    app
      .route("/api/docentes/:id")
      .get(
        authenticate,
        authorize,
        this.teacherController.getOne.bind(this.teacherController)
      );

    // create
    app
      .route("/api/docentes")
      .post(
        authenticate,
        authorize,
        this.teacherController.create.bind(this.teacherController)
      );

    // update PUT / PATCH
    app
      .route("/api/docentes/:id")
      .put(
        authenticate,
        authorize,
        this.teacherController.updatePut.bind(this.teacherController)
      )
      .patch(
        authenticate,
        authorize,
        this.teacherController.updatePatch.bind(this.teacherController)
      );

    // delete físico
    app
      .route("/api/docentes/:id")
      .delete(
        authenticate,
        authorize,
        this.teacherController.deletePhysical.bind(this.teacherController)
      );

    // delete lógico
    app
      .route("/api/docentes/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.teacherController.deleteLogical.bind(this.teacherController)
      );
  }
}