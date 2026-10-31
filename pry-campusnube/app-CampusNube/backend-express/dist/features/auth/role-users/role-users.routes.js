"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUsersRoutes = void 0;
const role_users_controller_1 = require("./role-users.controller");
const access_1 = require("../access");
/**
 * Rutas del feature RoleUsers — **modalidad 3 (JWT + RBAC)**.
 *
 * Es la vía administrativa para **asignar un rol a un usuario**:
 * `POST /api/asignaciones-rol` con `{ user_id, role_id }`.
 *
 * No hay borrado físico: retirar un rol es un borrado lógico (`/deactivate`) y
 * es reversible (`/reactivate`). La auditoría de quién tuvo qué rol se conserva.
 */
class RoleUsersRoutes {
    constructor() {
        this.roleUsersController = new role_users_controller_1.RoleUsersController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/asignaciones-rol")
            .get(access_1.authenticate, access_1.authorize, this.roleUsersController.getAll.bind(this.roleUsersController));
        // getOne
        app
            .route("/api/asignaciones-rol/:id")
            .get(access_1.authenticate, access_1.authorize, this.roleUsersController.getOne.bind(this.roleUsersController));
        // asignar rol (create)
        app
            .route("/api/asignaciones-rol")
            .post(access_1.authenticate, access_1.authorize, this.roleUsersController.assign.bind(this.roleUsersController));
        // retirar rol (delete lógico)
        app
            .route("/api/asignaciones-rol/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.roleUsersController.deactivate.bind(this.roleUsersController));
        // reactivar asignación
        app
            .route("/api/asignaciones-rol/:id/reactivate")
            .patch(access_1.authenticate, access_1.authorize, this.roleUsersController.reactivate.bind(this.roleUsersController));
    }
}
exports.RoleUsersRoutes = RoleUsersRoutes;
//# sourceMappingURL=role-users.routes.js.map