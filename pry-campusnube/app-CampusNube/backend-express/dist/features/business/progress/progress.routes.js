"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressRoutes = void 0;
const progress_controller_1 = require("./progress.controller");
const access_1 = require("../../auth/access");
class ProgressRoutes {
    constructor() {
        this.progressController = new progress_controller_1.ProgressController();
    }
    routes(app) {
        app
            .route("/api/progress")
            .get(access_1.authenticate, access_1.authorize, this.progressController.getAll.bind(this.progressController))
            .post(access_1.authenticate, access_1.authorize, this.progressController.create.bind(this.progressController));
        app
            .route("/api/progress/:id")
            .get(access_1.authenticate, access_1.authorize, this.progressController.getOne.bind(this.progressController))
            .put(access_1.authenticate, access_1.authorize, this.progressController.update.bind(this.progressController))
            .patch(access_1.authenticate, access_1.authorize, this.progressController.patch.bind(this.progressController))
            .delete(access_1.authenticate, access_1.authorize, this.progressController.delete.bind(this.progressController));
        app
            .route("/api/progress/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.progressController.deactivate.bind(this.progressController));
    }
}
exports.ProgressRoutes = ProgressRoutes;
//# sourceMappingURL=progress.routes.js.map