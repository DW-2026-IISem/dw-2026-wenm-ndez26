import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface EnrollmentI {
  id?: number;
  learner_id: number;
  course_id: number;
  enrollment_date?: Date;
  status: "active" | "inactive";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Enrollment extends Model {
  public id!: number;
  public learner_id!: number;
  public course_id!: number;
  public enrollment_date!: Date;
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