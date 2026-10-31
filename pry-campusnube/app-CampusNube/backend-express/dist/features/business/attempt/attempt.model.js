"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attempt = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Attempt extends sequelize_1.Model {
}
exports.Attempt = Attempt;
Attempt.init({
    enrollment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
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
    modelName: "Attempt",
    tableName: "attempts",
    timestamps: true,
});
//# sourceMappingURL=attempt.model.js.map