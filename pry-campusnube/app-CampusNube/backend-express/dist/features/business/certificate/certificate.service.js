"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const app_error_1 = require("../../../shared/errors/app-error");
const certificate_repository_1 = require("./certificate.repository");
const dto_1 = require("./dto");
class CertificateService {
    constructor() {
        this.repository = new certificate_repository_1.CertificateRepository();
    }
    async findOrFail(id) {
        const certificate = await this.repository.findById(id);
        if (!certificate) {
            throw new app_error_1.AppError(404, "Certificate not found");
        }
        return certificate;
    }
    async validateActiveEnrollment(enrollmentId) {
        const enrollment = await this.repository.findActiveEnrollment(enrollmentId);
        if (!enrollment) {
            throw new app_error_1.AppError(404, "The indicated enrollment does not exist or is inactive");
        }
    }
    async getAll() {
        const certificates = await this.repository.findAll();
        return certificates.map(dto_1.toCertificateResponse);
    }
    async getOne(id) {
        const certificate = await this.findOrFail(id);
        return (0, dto_1.toCertificateResponse)(certificate);
    }
    async create(data) {
        await this.validateActiveEnrollment(data.enrollment_id);
        const existing = await this.repository.findByEnrollmentId(data.enrollment_id);
        if (existing) {
            throw new app_error_1.AppError(409, "The enrollment already has an associated certificate");
        }
        const certificate = await this.repository.create(data);
        return (0, dto_1.toCertificateResponse)(certificate);
    }
    async update(id, data) {
        const certificate = await this.findOrFail(id);
        await this.validateActiveEnrollment(data.enrollment_id);
        if (data.enrollment_id !== certificate.enrollment_id) {
            const existing = await this.repository.findByEnrollmentId(data.enrollment_id);
            if (existing && existing.id !== certificate.id) {
                throw new app_error_1.AppError(409, "The enrollment already has an associated certificate");
            }
        }
        const updated = await this.repository.update(certificate, data);
        return (0, dto_1.toCertificateResponse)(updated);
    }
    async patch(id, data) {
        const certificate = await this.findOrFail(id);
        if (data.enrollment_id !== undefined) {
            await this.validateActiveEnrollment(data.enrollment_id);
            if (data.enrollment_id !== certificate.enrollment_id) {
                const existing = await this.repository.findByEnrollmentId(data.enrollment_id);
                if (existing && existing.id !== certificate.id) {
                    throw new app_error_1.AppError(409, "The enrollment already has an associated certificate");
                }
            }
        }
        const updated = await this.repository.patch(certificate, data);
        return (0, dto_1.toCertificateResponse)(updated);
    }
    async delete(id) {
        const certificate = await this.findOrFail(id);
        await this.repository.delete(certificate);
    }
    async deactivate(id) {
        const certificate = await this.findOrFail(id);
        const updated = await this.repository.deactivate(certificate);
        return (0, dto_1.toCertificateResponse)(updated);
    }
}
exports.CertificateService = CertificateService;
//# sourceMappingURL=certificate.service.js.map