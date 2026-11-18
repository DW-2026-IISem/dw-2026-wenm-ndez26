import { Transaction } from "sequelize";
import { Course, CourseI } from "./course.model";
import { Teacher } from "../teacher/teacher.model";

const withTeachers = [
  {
    model: Teacher,
    as: "teachers",
    through: { attributes: [] as string[] },
  },
];

export class CourseRepository {
  async findAllActive(): Promise<CourseI[]> {
    return Course.findAll({
      where: {
        isActive: true,
      },
      include: withTeachers,
    });
  }

  async findById(
    id: number,
    transaction?: Transaction,
    onlyActive = true
  ): Promise<CourseI | null> {
    return Course.findOne({
      where: {
        id,
        ...(onlyActive ? { isActive: true } : {}),
      },
      include: withTeachers,
      transaction,
    });
  }

  async create(
    data: Partial<CourseI>,
    transaction?: Transaction
  ): Promise<CourseI> {
    return Course.create(data as any, {
      transaction,
    });
  }

  async update(
    id: number,
    data: Partial<CourseI>,
    transaction?: Transaction
  ): Promise<CourseI | null> {
    const course = await Course.findByPk(id, {
      transaction,
    });

    if (!course) {
      return null;
    }

    await course.update(data, {
      transaction,
    });

    return course;
  }

  async setTeachers(
    id: number,
    teacherIds: number[],
    transaction?: Transaction
  ): Promise<void> {
    const course = await Course.findByPk(id, { transaction });
    if (!course) return;
    await (course as any).setTeachers(teacherIds, { transaction });
  }

  async delete(
    id: number,
    transaction?: Transaction
  ): Promise<number> {
    return Course.destroy({
      where: {
        id,
      },
      transaction,
    });
  }
}
