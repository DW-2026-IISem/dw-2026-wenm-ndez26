"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateRepository = void 0;
const enrollment_model_1 = require("../enrollment/enrollment.model");
const certificate_model_1 = require("./certificate.model");
class CertificateRepository {
    async findAll() {
        return certificate_model_1.Certificate.findAll({
            where: {
                isActive: true,
            },
        });
    }
    async findById(id) {
        return certificate_model_1.Certificate.findOne({
            where: {
                id,
                isActive: true,
            },
        });
    }
    async findByEnrollmentId(enrollmentId) {
        return certificate_model_1.Certificate.findOne({
            where: {
                enrollment_id: enrollmentId,
            },
        });
    }
    async findActiveEnrollment(enrollmentId) {
        return enrollment_model_1.Enrollment.findOne({
            where: {
                id: enrollmentId,
                status: "active",
            },
        });
    }
    async create(data) {
        return certificate_model_1.Certificate.create({
            enrollment_id: data.enrollment_id,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true,
        });
    }
    async update(certificate, data) {
        await certificate.update({
            enrollment_id: data.enrollment_id,
            name: data.name,
            description: data.description ?? null,
        });
        return certificate;
    }
    async patch(certificate, data) {
        await certificate.update({
            ...(data.enrollment_id !== undefined && {
                enrollment_id: data.enrollment_id,
            }),
            ...(data.name !== undefined && {
                name: data.name,
            }),
            ...(data.description !== undefined && {
                description: data.description,
            }),
        });
        return certificate;
    }
    async delete(certificate) {
        await certificate.destroy();
    }
    async deactivate(certificate) {
        await certificate.update({
            isActive: false,
        });
        return certificate;
    }
}
exports.CertificateRepository = CertificateRepository;
//# sourceMappingURL=certificate.repository.js.map