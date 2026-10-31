"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Submission = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Submission extends sequelize_1.Model {
}
exports.Submission = Submission;
Submission.init({
    referencia_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    lesson_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    enrollment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_inicio: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    fecha_fin: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    observaciones: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Submission",
    tableName: "submissions",
    timestamps: true,
});
//# sourceMappingURL=submission.model.js.map