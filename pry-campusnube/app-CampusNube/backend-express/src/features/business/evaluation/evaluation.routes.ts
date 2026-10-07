import { Application } from "express";
import { EvaluationController } from "./evaluation.controller";
import { authenticate, authorize } from "../../auth/access";

export class EvaluationRoutes {
  public evaluationController: EvaluationController =
    new EvaluationController();

  public routes(app: Application): void {
    app
      .route("/api/evaluaciones")
      .get(
        authenticate,
        authorize,
        this.evaluationController.getAll.bind(this.evaluationController)
      )
      .post(
        authenticate,
        authorize,
        this.evaluationController.create.bind(this.evaluationController)
      );

    app
      .route("/api/evaluaciones/:id")
      .get(
        authenticate,
        authorize,
        this.evaluationController.getOne.bind(this.evaluationController)
      )
      .put(
        authenticate,
        authorize,
        this.evaluationController.update.bind(this.evaluationController)
      )
      .patch(
        authenticate,
        authorize,
        this.evaluationController.patch.bind(this.evaluationController)
      )
      .delete(
        authenticate,
        authorize,
        this.evaluationController.delete.bind(this.evaluationController)
      );

    app
      .route("/api/evaluaciones/:id/deactivate")
      .patch(
        authenticate,
        authorize,
        this.evaluationController.deactivate.bind(
          this.evaluationController
        )
      );
  }
}