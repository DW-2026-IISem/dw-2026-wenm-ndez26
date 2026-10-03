import { Transaction } from "sequelize";
import { Evaluation, EvaluationI } from "./evaluation.model";

export class EvaluationRepository {
  async findAllActive(): Promise<EvaluationI[]> {
    return Evaluation.findAll({
      where: { isActive: true },
      order: [["id", "ASC"]],
    });
  }

  async findById(
    id: number,
    transaction?: Transaction,
    onlyActive = true
  ): Promise<EvaluationI | null> {
    return Evaluation.findOne({
      where: {
        id,
        ...(onlyActive ? { isActive: true } : {}),
      },
      transaction,
    });
  }

  async create(
    data: Partial<EvaluationI>,
    transaction?: Transaction
  ): Promise<EvaluationI> {
    return Evaluation.create(data as any, { transaction });
  }

  async update(
    id: number,
    data: Partial<EvaluationI>,
    transaction?: Transaction
  ): Promise<EvaluationI | null> {
    const evaluation = await Evaluation.findByPk(id, {
      transaction,
    });

    if (!evaluation) {
      return null;
    }

    await evaluation.update(data, { transaction });

    return evaluation;
  }

  async delete(
    id: number,
    transaction?: Transaction
  ): Promise<number> {
    return Evaluation.destroy({
      where: { id },
      transaction,
    });
  }
}
