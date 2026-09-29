import { Application } from "express";
import { EvaluationController } from "./evaluation.controller";

export class EvaluationRoutes {
  public evaluationController: EvaluationController =
    new EvaluationController();

  public routes(app: Application): void {
    app
      .route("/api/evaluaciones")
      .get(
        this.evaluationController.getAll.bind(this.evaluationController)
      )
      .post(
        this.evaluationController.create.bind(this.evaluationController)
      );

    app
      .route("/api/evaluaciones/:id")
      .get(
        this.evaluationController.getOne.bind(this.evaluationController)
      )
      .put(
        this.evaluationController.update.bind(this.evaluationController)
      )
      .patch(
        this.evaluationController.patch.bind(this.evaluationController)
      )
      .delete(
        this.evaluationController.delete.bind(this.evaluationController)
      );

    app
      .route("/api/evaluaciones/:id/deactivate")
      .patch(
        this.evaluationController.deactivate.bind(
          this.evaluationController
        )
      );
  }
}
