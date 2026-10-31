"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherRoutes = void 0;
const teacher_controller_1 = require("./teacher.controller");
const access_1 = require("../../auth/access");
class TeacherRoutes {
    constructor() {
        this.teacherController = new teacher_controller_1.TeacherController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/docentes")
            .get(access_1.authenticate, access_1.authorize, this.teacherController.getAll.bind(this.teacherController));
        // getOne
        app
            .route("/api/docentes/:id")
            .get(access_1.authenticate, access_1.authorize, this.teacherController.getOne.bind(this.teacherController));
        // create
        app
            .route("/api/docentes")
            .post(access_1.authenticate, access_1.authorize, this.teacherController.create.bind(this.teacherController));
        // update PUT / PATCH
        app
            .route("/api/docentes/:id")
            .put(access_1.authenticate, access_1.authorize, this.teacherController.updatePut.bind(this.teacherController))
            .patch(access_1.authenticate, access_1.authorize, this.teacherController.updatePatch.bind(this.teacherController));
        // delete físico
        app
            .route("/api/docentes/:id")
            .delete(access_1.authenticate, access_1.authorize, this.teacherController.deletePhysical.bind(this.teacherController));
        // delete lógico
        app
            .route("/api/docentes/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.teacherController.deleteLogical.bind(this.teacherController));
    }
}
exports.TeacherRoutes = TeacherRoutes;
//# sourceMappingURL=teacher.routes.js.map