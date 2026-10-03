import { Transaction } from "sequelize";
import { Enrollment, EnrollmentI } from "./enrollment.model";

export class EnrollmentRepository {
  async findAllActive(): Promise<EnrollmentI[]> {
    return Enrollment.findAll({
      where: { status: "active" },
      order: [["id", "ASC"]],
    });
  }

  async findById(
    id: number,
    transaction?: Transaction,
    onlyActive = true
  ): Promise<EnrollmentI | null> {
    return Enrollment.findOne({
      where: {
        id,
        ...(onlyActive ? { status: "active" } : {}),
      },
      transaction,
    });
  }

  async create(
    data: Partial<EnrollmentI>,
    transaction?: Transaction
  ): Promise<EnrollmentI> {
    return Enrollment.create(data as any, { transaction });
  }

  async update(
    id: number,
    data: Partial<EnrollmentI>,
    transaction?: Transaction
  ): Promise<EnrollmentI | null> {
    const enrollment = await Enrollment.findByPk(id, { transaction });

    if (!enrollment) {
      return null;
    }

    await enrollment.update(data, { transaction });

    return enrollment;
  }

  async delete(
    id: number,
    transaction?: Transaction
  ): Promise<number> {
    return Enrollment.destroy({
      where: { id },
      transaction,
    });
  }
}
