import { Transaction } from "sequelize";
import { Teacher, TeacherI } from "./teacher.model";

export class TeacherRepository {
  async findAllActive(): Promise<TeacherI[]> {
    return Teacher.findAll({
      where: {
        isActive: true,
      },
    });
  }

  async findById(
    id: number,
    transaction?: Transaction,
    onlyActive = true
  ): Promise<TeacherI | null> {
    return Teacher.findOne({
      where: {
        id,
        ...(onlyActive ? { isActive: true } : {}),
      },
      transaction,
    });
  }

  async create(
    data: Partial<TeacherI>,
    transaction?: Transaction
  ): Promise<TeacherI> {
    return Teacher.create(data as any, {
      transaction,
    });
  }

  async update(
    id: number,
    data: Partial<TeacherI>,
    transaction?: Transaction
  ): Promise<TeacherI | null> {
    const teacher = await Teacher.findByPk(id, {
      transaction,
    });

    if (!teacher) {
      return null;
    }

    await teacher.update(data, {
      transaction,
    });

    return teacher;
  }

  async delete(
    id: number,
    transaction?: Transaction
  ): Promise<number> {
    return Teacher.destroy({
      where: {
        id,
      },
      transaction,
    });
  }
}
