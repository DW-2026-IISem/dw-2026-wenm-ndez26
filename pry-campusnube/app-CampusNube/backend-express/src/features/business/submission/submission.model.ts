import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../database/db";

export interface SubmissionI {
  id?: number;
  referencia_id: number;
  lesson_id: number;
  enrollment_id: number;
  fecha_inicio: Date;
  fecha_fin?: Date | null;
  total?: number | null;
  estado: string;
  observaciones?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Submission extends Model {
  public id!: number;
  public referencia_id!: number;
  public lesson_id!: number;
  public enrollment_id!: number;
  public fecha_inicio!: Date;
  public fecha_fin!: Date | null;
  public total!: number | null;
  public estado!: string;
  public observaciones!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Submission.init(
  {
    referencia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    enrollment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Submission",
    tableName: "submissions",
    timestamps: true,
  }
);
