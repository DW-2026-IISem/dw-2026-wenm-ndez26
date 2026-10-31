"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const course_controller_1 = require("./course.controller");
const access_1 = require("../../auth/access");
class CourseRoutes {
    constructor() {
        this.courseController = new course_controller_1.CourseController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/cursos")
            .get(access_1.authenticate, access_1.authorize, this.courseController.getAll.bind(this.courseController));
        // getOne
        app
            .route("/api/cursos/:id")
            .get(access_1.authenticate, access_1.authorize, this.courseController.getOne.bind(this.courseController));
        // create
        app
            .route("/api/cursos")
            .post(access_1.authenticate, access_1.authorize, this.courseController.create.bind(this.courseController));
        // update PUT / PATCH
        app
            .route("/api/cursos/:id")
            .put(access_1.authenticate, access_1.authorize, this.courseController.updatePut.bind(this.courseController))
            .patch(access_1.authenticate, access_1.authorize, this.courseController.updatePatch.bind(this.courseController));
        // delete físico
        app
            .route("/api/cursos/:id")
            .delete(access_1.authenticate, access_1.authorize, this.courseController.deletePhysical.bind(this.courseController));
        // delete lógico
        app
            .route("/api/cursos/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.courseController.deleteLogical.bind(this.courseController));
    }
}
exports.CourseRoutes = CourseRoutes;
//# sourceMappingURL=course.routes.js.map