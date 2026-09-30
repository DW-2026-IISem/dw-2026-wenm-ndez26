import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface AttemptI {
  id?: number;
  enrollment_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Attempt extends Model {
  public id!: number;
  public enrollment_id!: number;
  public name!: string;
  public description!: string | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attempt.init(
  {
    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Attempt",
    tableName: "attempts",
    timestamps: true,
  }
);
