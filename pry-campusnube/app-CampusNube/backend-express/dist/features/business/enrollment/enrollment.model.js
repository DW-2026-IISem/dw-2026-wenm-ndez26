"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Enrollment extends sequelize_1.Model {
}
exports.Enrollment = Enrollment;
Enrollment.init({
    learner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    course_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    enrollment_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Enrollment",
    tableName: "enrollments",
    timestamps: true,
});
//# sourceMappingURL=enrollment.model.js.map