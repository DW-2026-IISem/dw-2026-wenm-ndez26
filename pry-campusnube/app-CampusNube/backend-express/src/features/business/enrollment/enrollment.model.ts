import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface EnrollmentI {
  id?: number;
  learner_id: number;
  course_id: number;
  enrollment_date?: Date;
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Enrollment extends Model {
  public id!: number;
  public learner_id!: number;
  public course_id!: number;
  public enrollment_date!: Date;
  public name!: string | null;
  public description!: string | null;
  public isActive!: boolean;
  public status!: "active" | "inactive";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Enrollment.init(
  {
    learner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enrollment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
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
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Enrollment",
    tableName: "enrollments",
    timestamps: true,
  }
);