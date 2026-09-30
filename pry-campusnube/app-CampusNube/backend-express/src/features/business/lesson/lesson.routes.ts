import { Application } from "express";
import { LessonController } from "./lesson.controller";

export class LessonRoutes {
  public lessonController: LessonController =
    new LessonController();

  public routes(app: Application): void {
    app
      .route("/api/lecciones")
      .get(
        this.lessonController.getAll.bind(this.lessonController)
      )
      .post(
        this.lessonController.create.bind(this.lessonController)
      );

    app
      .route("/api/lecciones/:id")
      .get(
        this.lessonController.getOne.bind(this.lessonController)
      )
      .put(
        this.lessonController.update.bind(this.lessonController)
      )
      .patch(
        this.lessonController.patch.bind(this.lessonController)
      )
      .delete(
        this.lessonController.delete.bind(this.lessonController)
      );

    app
      .route("/api/lecciones/:id/deactivate")
      .patch(
        this.lessonController.deactivate.bind(
          this.lessonController
        )
      );
  }
}
