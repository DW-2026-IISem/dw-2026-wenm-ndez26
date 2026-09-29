import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface CourseI {
  id?: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Course extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Course.init(
  {
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
    modelName: "Course",
    tableName: "courses",
    timestamps: true,
  }
);
