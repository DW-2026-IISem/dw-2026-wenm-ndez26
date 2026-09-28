import { Application } from "express";
import { TeacherController } from "./teacher.controller";

export class TeacherRoutes {
  public teacherController: TeacherController = new TeacherController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================

    // getAll
    app
      .route("/api/docentes")
      .get(this.teacherController.getAll.bind(this.teacherController));

    // getOne
    app
      .route("/api/docentes/:id")
      .get(this.teacherController.getOne.bind(this.teacherController));

    // create
    app
      .route("/api/docentes")
      .post(this.teacherController.create.bind(this.teacherController));

    // update (PUT / PATCH)
    app
      .route("/api/docentes/:id")
      .put(this.teacherController.updatePut.bind(this.teacherController))
      .patch(this.teacherController.updatePatch.bind(this.teacherController));

    // delete físico
    app
      .route("/api/docentes/:id")
      .delete(this.teacherController.deletePhysical.bind(this.teacherController));

    // delete lógico
    app
      .route("/api/docentes/:id/deactivate")
      .patch(this.teacherController.deleteLogical.bind(this.teacherController));
  }
}
