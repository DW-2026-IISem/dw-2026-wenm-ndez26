import { Application } from "express";
import { CourseController } from "./course.controller";

export class CourseRoutes {
  public courseController: CourseController = new CourseController();

  public routes(app: Application): void {
    // RUTAS SIN AUTENTICACIÓN

    app
      .route("/api/cursos")
      .get(this.courseController.getAll.bind(this.courseController));

    app
      .route("/api/cursos/:id")
      .get(this.courseController.getOne.bind(this.courseController));

    app
      .route("/api/cursos")
      .post(this.courseController.create.bind(this.courseController));

    app
      .route("/api/cursos/:id")
      .put(this.courseController.updatePut.bind(this.courseController))
      .patch(this.courseController.updatePatch.bind(this.courseController));

    app
      .route("/api/cursos/:id")
      .delete(
        this.courseController.deletePhysical.bind(this.courseController)
      );

    app
      .route("/api/cursos/:id/deactivate")
      .patch(
        this.courseController.deleteLogical.bind(this.courseController)
      );
  }
}
