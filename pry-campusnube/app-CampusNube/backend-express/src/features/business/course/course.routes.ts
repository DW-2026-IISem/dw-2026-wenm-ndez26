import { Application } from "express";
import { CourseController } from "./course.controller";
import { authenticate, authorize } from "../../auth/access";

export class CourseRoutes {
  public courseController: CourseController = new CourseController();

  public routes(app: Application): void {
    // getAll
    app
      .route("/api/cursos")
      .get(
        authenticate,
        authorize,
        this.courseController.getAll.bind(this.courseController)
      );

    // getOne
    app
      .route("/api/cursos/:id")
      .get(
        authenticate,
        authorize,
        this.courseController.getOne.bind(this.courseController)
      );

    // create
    app
      .route("/api/cursos")
      .post(
        authenticate,
        authorize,
        this.courseController.create.bind(this.courseController)
      );

    // update PUT / PATCH
    app
      .route("/api/cursos/:id")
      .put(
        authenticate,
        authorize,
        this.courseController.updatePut.bind(this.courseController)
      )
      .patch(
        authenticate,
        authorize,
        this.courseController.updatePatch.bind(this.courseController)
      );

    // delete físico
    app
      .route("/api/cursos/:id")
      .delete(
        authenticate,
        authorize,
        this.courseController.deletePhysical.bind(this.courseController)
      );

    // delete lógico
    app
      .route("/api/cursos/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.courseController.deleteLogical.bind(this.courseController)
      );
  }
}
