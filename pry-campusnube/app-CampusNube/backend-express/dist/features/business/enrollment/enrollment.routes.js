"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentRoutes = void 0;
const enrollment_controller_1 = require("./enrollment.controller");
const access_1 = require("../../auth/access");
class EnrollmentRoutes {
    constructor() {
        this.enrollmentController = new enrollment_controller_1.EnrollmentController();
    }
    routes(app) {
        app
            .route("/api/inscripciones")
            .get(access_1.authenticate, access_1.authorize, this.enrollmentController.getAll.bind(this.enrollmentController))
            .post(access_1.authenticate, access_1.authorize, this.enrollmentController.create.bind(this.enrollmentController));
        app
            .route("/api/inscripciones/:id")
            .get(access_1.authenticate, access_1.authorize, this.enrollmentController.getOne.bind(this.enrollmentController))
            .put(access_1.authenticate, access_1.authorize, this.enrollmentController.update.bind(this.enrollmentController))
            .patch(access_1.authenticate, access_1.authorize, this.enrollmentController.patch.bind(this.enrollmentController))
            .delete(access_1.authenticate, access_1.authorize, this.enrollmentController.delete.bind(this.enrollmentController));
        app
            .route("/api/inscripciones/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.enrollmentController.deactivate.bind(this.enrollmentController));
    }
}
exports.EnrollmentRoutes = EnrollmentRoutes;
//# sourceMappingURL=enrollment.routes.js.map