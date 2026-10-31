"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRoutes = void 0;
const roles_controller_1 = require("./roles.controller");
const access_1 = require("../access");
/** Rutas del feature Roles — **modalidad 3 (JWT + RBAC)** en todas las operaciones. */
class RolesRoutes {
    constructor() {
        this.rolesController = new roles_controller_1.RolesController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/roles")
            .get(access_1.authenticate, access_1.authorize, this.rolesController.getAll.bind(this.rolesController));
        // getOne
        app
            .route("/api/roles/:id")
            .get(access_1.authenticate, access_1.authorize, this.rolesController.getOne.bind(this.rolesController));
        // create
        app
            .route("/api/roles")
            .post(access_1.authenticate, access_1.authorize, this.rolesController.create.bind(this.rolesController));
        // update (PUT / PATCH)
        app
            .route("/api/roles/:id")
            .put(access_1.authenticate, access_1.authorize, this.rolesController.updatePut.bind(this.rolesController))
            .patch(access_1.authenticate, access_1.authorize, this.rolesController.updatePatch.bind(this.rolesController));
        // delete físico
        app
            .route("/api/roles/:id")
            .delete(access_1.authenticate, access_1.authorize, this.rolesController.deletePhysical.bind(this.rolesController));
        // delete lógico
        app
            .route("/api/roles/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.rolesController.deleteLogical.bind(this.rolesController));
    }
}
exports.RolesRoutes = RolesRoutes;
//# sourceMappingURL=roles.routes.js.map