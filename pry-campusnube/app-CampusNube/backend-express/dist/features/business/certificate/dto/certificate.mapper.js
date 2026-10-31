"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCertificateResponse = toCertificateResponse;
function toCertificateResponse(certificate) {
    return {
        id: certificate.id,
        enrollment_id: certificate.enrollment_id,
        name: certificate.name,
        description: certificate.description,
        isActive: certificate.isActive,
        createdAt: certificate.createdAt,
        updatedAt: certificate.updatedAt,
    };
}
//# sourceMappingURL=certificate.mapper.js.map