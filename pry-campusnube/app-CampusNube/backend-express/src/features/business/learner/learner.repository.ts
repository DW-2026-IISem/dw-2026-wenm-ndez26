
import { Transaction } from "sequelize";
import { Learner, LearnerI } from "./learner.model";

export class LearnerRepository {
  async findAllActive(): Promise<Learner[]> {
    return Learner.findAll({
      where: {
        status: "active",
      },
    });
  }

  async findById(
    id: number,
    transaction?: Transaction,
    onlyActive = true
  ): Promise<Learner | null> {
    return Learner.findOne({
      where: {
        id,
        ...(onlyActive ? { status: "active" } : {}),
      },
      transaction,
    });
  }

  async create(
    data: Partial<LearnerI>,
    transaction?: Transaction
  ): Promise<Learner> {
    return Learner.create(data as any, {
      transaction,
    });
  }

  async update(
    id: number,
    data: Partial<LearnerI>,
    transaction?: Transaction
  ): Promise<Learner | null> {
    const learner = await Learner.findByPk(id, {
      transaction,
    });

    if (!learner) {
      return null;
    }

    await learner.update(data, {
      transaction,
    });

    return learner;
  }

  async delete(
    id: number,
    transaction?: Transaction
  ): Promise<number> {
    return Learner.destroy({
      where: {
        id,
      },
      transaction,
    });
  }
}
