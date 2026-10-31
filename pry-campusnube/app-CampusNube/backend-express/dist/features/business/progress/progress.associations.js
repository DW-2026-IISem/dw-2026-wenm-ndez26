"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const progress_model_1 = require("./progress.model");
const enrollment_model_1 = require("../enrollment/enrollment.model");
progress_model_1.Progress.belongsTo(enrollment_model_1.Enrollment, {
    foreignKey: "enrollment_id",
    as: "enrollment",
});
enrollment_model_1.Enrollment.hasMany(progress_model_1.Progress, {
    foreignKey: "enrollment_id",
    as: "progress",
});
//# sourceMappingURL=progress.associations.js.map