"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateRoutes = void 0;
const certificate_controller_1 = require("./certificate.controller");
const access_1 = require("../../auth/access");
class CertificateRoutes {
    constructor() {
        this.certificateController = new certificate_controller_1.CertificateController();
    }
    routes(app) {
        app
            .route("/api/certificates")
            .get(access_1.authenticate, access_1.authorize, this.certificateController.getAll.bind(this.certificateController))
            .post(access_1.authenticate, access_1.authorize, this.certificateController.create.bind(this.certificateController));
        app
            .route("/api/certificates/:id")
            .get(access_1.authenticate, access_1.authorize, this.certificateController.getOne.bind(this.certificateController))
            .put(access_1.authenticate, access_1.authorize, this.certificateController.update.bind(this.certificateController))
            .patch(access_1.authenticate, access_1.authorize, this.certificateController.patch.bind(this.certificateController))
            .delete(access_1.authenticate, access_1.authorize, this.certificateController.delete.bind(this.certificateController));
    }
}
exports.CertificateRoutes = CertificateRoutes;
//# sourceMappingURL=certificate.routes.js.map