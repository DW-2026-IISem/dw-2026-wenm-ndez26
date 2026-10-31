"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRoutes = void 0;
const lesson_controller_1 = require("./lesson.controller");
const access_1 = require("../../auth/access");
class LessonRoutes {
    constructor() {
        this.lessonController = new lesson_controller_1.LessonController();
    }
    routes(app) {
        app
            .route("/api/lecciones")
            .get(access_1.authenticate, access_1.authorize, this.lessonController.getAll.bind(this.lessonController))
            .post(access_1.authenticate, access_1.authorize, this.lessonController.create.bind(this.lessonController));
        app
            .route("/api/lecciones/:id")
            .get(access_1.authenticate, access_1.authorize, this.lessonController.getOne.bind(this.lessonController))
            .put(access_1.authenticate, access_1.authorize, this.lessonController.update.bind(this.lessonController))
            .patch(access_1.authenticate, access_1.authorize, this.lessonController.patch.bind(this.lessonController))
            .delete(access_1.authenticate, access_1.authorize, this.lessonController.delete.bind(this.lessonController));
        app
            .route("/api/lecciones/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.lessonController.deactivate.bind(this.lessonController));
    }
}
exports.LessonRoutes = LessonRoutes;
//# sourceMappingURL=lesson.routes.js.map