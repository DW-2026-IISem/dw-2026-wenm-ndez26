"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learner = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../../../database/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Learner extends sequelize_1.Model {
}
exports.Learner = Learner;
Learner.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("active", "inactive"),
        defaultValue: "inactive",
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Learner",
    tableName: "learners",
    timestamps: true,
    hooks: {
        beforeCreate: async (learner) => {
            if (learner.password) {
                const salt = await bcryptjs_1.default.genSalt(10);
                learner.password = await bcryptjs_1.default.hash(learner.password, salt);
            }
        },
        beforeUpdate: async (learner) => {
            if (learner.changed("password") && learner.password) {
                const salt = await bcryptjs_1.default.genSalt(10);
                learner.password = await bcryptjs_1.default.hash(learner.password, salt);
            }
        },
        beforeBulkCreate: async (learners) => {
            for (const learner of learners) {
                if (learner.password) {
                    const salt = await bcryptjs_1.default.genSalt(10);
                    learner.password = await bcryptjs_1.default.hash(learner.password, salt);
                }
            }
        },
    },
});
//# sourceMappingURL=learner.model.js.map