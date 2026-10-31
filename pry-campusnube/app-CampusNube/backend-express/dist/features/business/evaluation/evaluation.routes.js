"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationRoutes = void 0;
const evaluation_controller_1 = require("./evaluation.controller");
const access_1 = require("../../auth/access");
class EvaluationRoutes {
    constructor() {
        this.evaluationController = new evaluation_controller_1.EvaluationController();
    }
    routes(app) {
        app
            .route("/api/evaluaciones")
            .get(access_1.authenticate, access_1.authorize, this.evaluationController.getAll.bind(this.evaluationController))
            .post(access_1.authenticate, access_1.authorize, this.evaluationController.create.bind(this.evaluationController));
        app
            .route("/api/evaluaciones/:id")
            .get(access_1.authenticate, access_1.authorize, this.evaluationController.getOne.bind(this.evaluationController))
            .put(access_1.authenticate, access_1.authorize, this.evaluationController.update.bind(this.evaluationController))
            .patch(access_1.authenticate, access_1.authorize, this.evaluationController.patch.bind(this.evaluationController))
            .delete(access_1.authenticate, access_1.authorize, this.evaluationController.delete.bind(this.evaluationController));
        app
            .route("/api/evaluaciones/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.evaluationController.deactivate.bind(this.evaluationController));
    }
}
exports.EvaluationRoutes = EvaluationRoutes;
//# sourceMappingURL=evaluation.routes.js.map