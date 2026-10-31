"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearnerRoutes = void 0;
const learner_controller_1 = require("./learner.controller");
const access_1 = require("../../auth/access");
class LearnerRoutes {
    constructor() {
        this.learnerController = new learner_controller_1.LearnerController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/aprendices")
            .get(access_1.authenticate, access_1.authorize, this.learnerController.getAll.bind(this.learnerController));
        // getOne
        app
            .route("/api/aprendices/:id")
            .get(access_1.authenticate, access_1.authorize, this.learnerController.getOne.bind(this.learnerController));
        // create
        app
            .route("/api/aprendices")
            .post(access_1.authenticate, access_1.authorize, this.learnerController.create.bind(this.learnerController));
        // update PUT / PATCH
        app
            .route("/api/aprendices/:id")
            .put(access_1.authenticate, access_1.authorize, this.learnerController.updatePut.bind(this.learnerController))
            .patch(access_1.authenticate, access_1.authorize, this.learnerController.updatePatch.bind(this.learnerController));
        // delete físico
        app
            .route("/api/aprendices/:id")
            .delete(access_1.authenticate, access_1.authorize, this.learnerController.deletePhysical.bind(this.learnerController));
        // delete lógico
        app
            .route("/api/aprendices/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.learnerController.deleteLogical.bind(this.learnerController));
    }
}
exports.LearnerRoutes = LearnerRoutes;
//# sourceMappingURL=learner.routes.js.map