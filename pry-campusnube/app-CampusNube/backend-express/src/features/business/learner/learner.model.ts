import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";
import bcrypt from "bcryptjs";

export interface LearnerI {
  id?: number;
  name: string;
  description: string;
  password: string;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Learner extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public password!: string;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Learner.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Learner",
    tableName: "learners",
    timestamps: true,
    hooks: {
      beforeCreate: async (learner: Learner) => {
        if (learner.password) {
          const salt = await bcrypt.genSalt(10);
          learner.password = await bcrypt.hash(learner.password, salt);
        }
      },
      beforeUpdate: async (learner: Learner) => {
        if (learner.changed("password") && learner.password) {
          const salt = await bcrypt.genSalt(10);
          learner.password = await bcrypt.hash(learner.password, salt);
        }
      },
      beforeBulkCreate: async (learners: Learner[]) => {
        for (const learner of learners) {
          if (learner.password) {
            const salt = await bcrypt.genSalt(10);
            learner.password = await bcrypt.hash(learner.password, salt);
          }
        }
      },
    },
  }
);
