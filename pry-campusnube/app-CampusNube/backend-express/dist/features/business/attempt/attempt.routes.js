"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttemptRoutes = void 0;
const attempt_controller_1 = require("./attempt.controller");
const access_1 = require("../../auth/access");
class AttemptRoutes {
    constructor() {
        this.attemptController = new attempt_controller_1.AttemptController();
    }
    routes(app) {
        app
            .route("/api/intentos")
            .get(access_1.authenticate, access_1.authorize, this.attemptController.getAll.bind(this.attemptController))
            .post(access_1.authenticate, access_1.authorize, this.attemptController.create.bind(this.attemptController));
        app
            .route("/api/intentos/:id")
            .get(access_1.authenticate, access_1.authorize, this.attemptController.getOne.bind(this.attemptController))
            .put(access_1.authenticate, access_1.authorize, this.attemptController.update.bind(this.attemptController))
            .patch(access_1.authenticate, access_1.authorize, this.attemptController.patch.bind(this.attemptController))
            .delete(access_1.authenticate, access_1.authorize, this.attemptController.delete.bind(this.attemptController));
        app
            .route("/api/intentos/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.attemptController.deactivate.bind(this.attemptController));
    }
}
exports.AttemptRoutes = AttemptRoutes;
//# sourceMappingURL=attempt.routes.js.map