"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Certificate = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Certificate extends sequelize_1.Model {
}
exports.Certificate = Certificate;
Certificate.init({
    enrollment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Certificate",
    tableName: "certificates",
    timestamps: true,
});
//# sourceMappingURL=certificate.model.js.map