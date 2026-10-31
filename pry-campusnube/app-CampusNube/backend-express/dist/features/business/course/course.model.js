"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
class Course extends sequelize_1.Model {
}
exports.Course = Course;
Course.init({
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
    modelName: "Course",
    tableName: "courses",
    timestamps: true,
});
//# sourceMappingURL=course.model.js.map