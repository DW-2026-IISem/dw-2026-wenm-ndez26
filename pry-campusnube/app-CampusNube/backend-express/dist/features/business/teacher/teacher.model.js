"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Teacher extends sequelize_1.Model {
}
exports.Teacher = Teacher;
Teacher.init({
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
    modelName: "Teacher",
    tableName: "teachers",
    timestamps: true,
});
//# sourceMappingURL=teacher.model.js.map