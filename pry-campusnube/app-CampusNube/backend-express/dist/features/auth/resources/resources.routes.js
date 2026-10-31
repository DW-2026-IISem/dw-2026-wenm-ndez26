"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesRoutes = void 0;
const resources_controller_1 = require("./resources.controller");
const access_1 = require("../access");
/** Rutas del feature Resources — **modalidad 3 (JWT + RBAC)** en todas las operaciones. */
class ResourcesRoutes {
    constructor() {
        this.resourcesController = new resources_controller_1.ResourcesController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/recursos")
            .get(access_1.authenticate, access_1.authorize, this.resourcesController.getAll.bind(this.resourcesController));
        // getOne
        app
            .route("/api/recursos/:id")
            .get(access_1.authenticate, access_1.authorize, this.resourcesController.getOne.bind(this.resourcesController));
        // create
        app
            .route("/api/recursos")
            .post(access_1.authenticate, access_1.authorize, this.resourcesController.create.bind(this.resourcesController));
        // update (PUT / PATCH)
        app
            .route("/api/recursos/:id")
            .put(access_1.authenticate, access_1.authorize, this.resourcesController.updatePut.bind(this.resourcesController))
            .patch(access_1.authenticate, access_1.authorize, this.resourcesController.updatePatch.bind(this.resourcesController));
        // delete físico
        app
            .route("/api/recursos/:id")
            .delete(access_1.authenticate, access_1.authorize, this.resourcesController.deletePhysical.bind(this.resourcesController));
        // delete lógico
        app
            .route("/api/recursos/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.resourcesController.deleteLogical.bind(this.resourcesController));
    }
}
exports.ResourcesRoutes = ResourcesRoutes;
//# sourceMappingURL=resources.routes.js.map