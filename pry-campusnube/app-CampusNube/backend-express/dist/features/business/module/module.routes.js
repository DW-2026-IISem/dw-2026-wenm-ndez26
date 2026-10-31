"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoutes = void 0;
const module_controller_1 = require("./module.controller");
const access_1 = require("../../auth/access");
class ModuleRoutes {
    constructor() {
        this.moduleController = new module_controller_1.ModuleController();
    }
    routes(app) {
        app
            .route("/api/modulos")
            .get(access_1.authenticate, access_1.authorize, this.moduleController.getAll.bind(this.moduleController))
            .post(access_1.authenticate, access_1.authorize, this.moduleController.create.bind(this.moduleController));
        app
            .route("/api/modulos/:id")
            .get(access_1.authenticate, access_1.authorize, this.moduleController.getOne.bind(this.moduleController))
            .put(access_1.authenticate, access_1.authorize, this.moduleController.update.bind(this.moduleController))
            .patch(access_1.authenticate, access_1.authorize, this.moduleController.patch.bind(this.moduleController))
            .delete(access_1.authenticate, access_1.authorize, this.moduleController.delete.bind(this.moduleController));
        app
            .route("/api/modulos/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.moduleController.deactivate.bind(this.moduleController));
    }
}
exports.ModuleRoutes = ModuleRoutes;
//# sourceMappingURL=module.routes.js.map