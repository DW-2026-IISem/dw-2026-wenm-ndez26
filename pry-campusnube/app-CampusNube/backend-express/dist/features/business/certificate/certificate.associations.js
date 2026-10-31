"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const certificate_model_1 = require("./certificate.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
certificate_model_1.Certificate.belongsTo(enrollment_model_1.Enrollment, {
    foreignKey: "enrollment_id",
    as: "enrollment",
});
enrollment_model_1.Enrollment.hasOne(certificate_model_1.Certificate, {
    foreignKey: "enrollment_id",
    as: "certificate",
});
//# sourceMappingURL=certificate.associations.js.map