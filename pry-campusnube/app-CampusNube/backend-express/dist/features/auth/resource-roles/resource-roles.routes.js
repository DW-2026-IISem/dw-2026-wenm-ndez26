"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRolesRoutes = void 0;
const resource_roles_controller_1 = require("./resource-roles.controller");
const access_1 = require("../access");
/**
 * Rutas del feature ResourceRoles — **modalidad 3 (JWT + RBAC)**.
 *
 * Es la vía administrativa para **conceder un recurso a un rol** (crear un
 * permiso):
 * `POST /api/concesiones-rol` con `{ role_id, resource_id }`.
 *
 * El efecto es inmediato y por datos: la siguiente petición del usuario afectado
 * ya consulta la nueva matriz. No se reinicia el servidor ni se despliega nada.
 */
class ResourceRolesRoutes {
    constructor() {
        this.resourceRolesController = new resource_roles_controller_1.ResourceRolesController();
    }
    routes(app) {
        // getAll (filtros ?role_id= y ?resource_id=)
        app
            .route("/api/concesiones-rol")
            .get(access_1.authenticate, access_1.authorize, this.resourceRolesController.getAll.bind(this.resourceRolesController));
        // getOne
        app
            .route("/api/concesiones-rol/:id")
            .get(access_1.authenticate, access_1.authorize, this.resourceRolesController.getOne.bind(this.resourceRolesController));
        // conceder recurso a rol (create)
        app
            .route("/api/concesiones-rol")
            .post(access_1.authenticate, access_1.authorize, this.resourceRolesController.grant.bind(this.resourceRolesController));
        // retirar permiso (delete lógico)
        app
            .route("/api/concesiones-rol/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.resourceRolesController.deactivate.bind(this.resourceRolesController));
        // reactivar permiso
        app
            .route("/api/concesiones-rol/:id/reactivate")
            .patch(access_1.authenticate, access_1.authorize, this.resourceRolesController.reactivate.bind(this.resourceRolesController));
    }
}
exports.ResourceRolesRoutes = ResourceRolesRoutes;
//# sourceMappingURL=resource-roles.routes.js.map