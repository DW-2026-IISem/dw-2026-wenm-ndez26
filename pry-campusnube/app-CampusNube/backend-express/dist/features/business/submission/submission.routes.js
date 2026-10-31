"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRoutes = void 0;
const submission_controller_1 = require("./submission.controller");
const access_1 = require("../../auth/access");
class SubmissionRoutes {
    constructor() {
        this.submissionController = new submission_controller_1.SubmissionController();
    }
    routes(app) {
        app
            .route("/api/entregas")
            .get(access_1.authenticate, access_1.authorize, this.submissionController.getAll.bind(this.submissionController))
            .post(access_1.authenticate, access_1.authorize, this.submissionController.create.bind(this.submissionController));
        app
            .route("/api/entregas/:id")
            .get(access_1.authenticate, access_1.authorize, this.submissionController.getOne.bind(this.submissionController))
            .put(access_1.authenticate, access_1.authorize, this.submissionController.update.bind(this.submissionController))
            .patch(access_1.authenticate, access_1.authorize, this.submissionController.patch.bind(this.submissionController))
            .delete(access_1.authenticate, access_1.authorize, this.submissionController.delete.bind(this.submissionController));
        app
            .route("/api/entregas/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.submissionController.deactivate.bind(this.submissionController));
    }
}
exports.SubmissionRoutes = SubmissionRoutes;
//# sourceMappingURL=submission.routes.js.map