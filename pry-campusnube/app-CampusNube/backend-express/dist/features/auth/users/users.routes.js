"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const users_controller_1 = require("./users.controller");
const access_1 = require("../access");
/**
 * Rutas del feature Users — **modalidad 3 (JWT + RBAC)** en todas las operaciones.
 *
 * La administración de identidades está ella misma protegida por la matriz de
 * permisos: no basta con estar autenticado, hay que tener la concesión concreta
 * (`GET /api/usuarios`, `POST /api/usuarios`, ...). El catálogo de recursos ya
 * incluye las 9 operaciones de este feature.
 */
class UsersRoutes {
    constructor() {
        this.usersController = new users_controller_1.UsersController();
    }
    routes(app) {
        // getAll
        app
            .route("/api/usuarios")
            .get(access_1.authenticate, access_1.authorize, this.usersController.getAll.bind(this.usersController));
        // getOne
        app
            .route("/api/usuarios/:id")
            .get(access_1.authenticate, access_1.authorize, this.usersController.getOne.bind(this.usersController));
        // create
        app
            .route("/api/usuarios")
            .post(access_1.authenticate, access_1.authorize, this.usersController.create.bind(this.usersController));
        // update (PUT / PATCH)
        app
            .route("/api/usuarios/:id")
            .put(access_1.authenticate, access_1.authorize, this.usersController.updatePut.bind(this.usersController))
            .patch(access_1.authenticate, access_1.authorize, this.usersController.updatePatch.bind(this.usersController));
        // delete físico
        app
            .route("/api/usuarios/:id")
            .delete(access_1.authenticate, access_1.authorize, this.usersController.deletePhysical.bind(this.usersController));
        // delete lógico
        app
            .route("/api/usuarios/:id/deactivate")
            .patch(access_1.authenticate, access_1.authorize, this.usersController.deleteLogical.bind(this.usersController));
        // cambio de contraseña
        app
            .route("/api/usuarios/:id/password")
            .patch(access_1.authenticate, access_1.authorize, this.usersController.changePassword.bind(this.usersController));
        // permisos efectivos del usuario
        app
            .route("/api/usuarios/:id/permisos")
            .get(access_1.authenticate, access_1.authorize, this.usersController.getEffectivePermissions.bind(this.usersController));
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=users.routes.js.map