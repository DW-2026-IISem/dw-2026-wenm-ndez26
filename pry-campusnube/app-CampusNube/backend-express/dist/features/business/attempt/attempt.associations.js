"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attempt_model_1 = require("./attempt.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
attempt_model_1.Attempt.belongsTo(enrollment_model_1.Enrollment, {
    foreignKey: "enrollment_id",
    as: "enrollment",
});
enrollment_model_1.Enrollment.hasMany(attempt_model_1.Attempt, {
    foreignKey: "enrollment_id",
    as: "attempts",
});
//# sourceMappingURL=attempt.associations.js.map