"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateController = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const base_controller_1 = require("../../../shared/http/base-controller");
const certificate_service_1 = require("./certificate.service");
class CertificateController extends base_controller_1.BaseController {
    constructor() {
        super(...arguments);
        this.service = new certificate_service_1.CertificateService();
    }
    async getAll(_req, res) {
        await this.run(res, async () => {
            const certificates = await this.service.getAll();
            res.status(200).json(certificates);
        });
    }
    async getOne(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const certificate = await this.service.getOne(id);
            res.status(200).json(certificate);
        });
    }
    async create(req, res) {
        await this.run(res, async () => {
            const { enrollment_id, name, description, isActive, } = req.body;
            if (!enrollment_id) {
                throw new app_error_1.AppError(400, "The enrollment_id field is required");
            }
            if (!name) {
                throw new app_error_1.AppError(400, "The name field is required");
            }
            const data = {
                enrollment_id,
                name,
                description,
                isActive,
            };
            const certificate = await this.service.create(data);
            res.status(201).json(certificate);
        });
    }
    async update(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const { enrollment_id, name, description, } = req.body;
            if (!enrollment_id) {
                throw new app_error_1.AppError(400, "The enrollment_id field is required");
            }
            if (!name) {
                throw new app_error_1.AppError(400, "The name field is required");
            }
            const data = {
                enrollment_id,
                name,
                description,
            };
            const certificate = await this.service.update(id, data);
            res.status(200).json(certificate);
        });
    }
    async patch(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const data = req.body;
            const certificate = await this.service.patch(id, data);
            res.status(200).json(certificate);
        });
    }
    async delete(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            await this.service.delete(id);
            res.status(200).json({
                message: "Certificate deleted successfully",
            });
        });
    }
    async deactivate(req, res) {
        await this.run(res, async () => {
            const id = this.paramId(req);
            const certificate = await this.service.deactivate(id);
            res.status(200).json(certificate);
        });
    }
}
exports.CertificateController = CertificateController;
//# sourceMappingURL=certificate.controller.js.map