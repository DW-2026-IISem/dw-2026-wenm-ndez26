import { Application } from "express";
import { LessonController } from "./lesson.controller";
import { authenticate, authorize } from "../../auth/access";

export class LessonRoutes {
  public lessonController: LessonController =
    new LessonController();

  public routes(app: Application): void {
    app
      .route("/api/lecciones")
      .get(
        authenticate,
        authorize,
        this.lessonController.getAll.bind(this.lessonController)
      )
      .post(
        authenticate,
        authorize,
        this.lessonController.create.bind(this.lessonController)
      );

    app
      .route("/api/lecciones/:id")
      .get(
        authenticate,
        authorize,
        this.lessonController.getOne.bind(this.lessonController)
      )
      .put(
        authenticate,
        authorize,
        this.lessonController.update.bind(this.lessonController)
      )
      .patch(
        authenticate,
        authorize,
        this.lessonController.patch.bind(this.lessonController)
      )
      .delete(
        authenticate,
        authorize,
        this.lessonController.delete.bind(this.lessonController)
      );

    app
      .route("/api/lecciones/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.lessonController.deactivate.bind(this.lessonController)
      );
  }
}
