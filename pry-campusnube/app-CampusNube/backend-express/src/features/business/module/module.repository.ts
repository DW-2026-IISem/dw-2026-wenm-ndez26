import { Transaction } from "sequelize";
import { Module, ModuleI } from "./module.model";

export class ModuleRepository {
  async findAllActive(): Promise<ModuleI[]> {
    return Module.findAll({
      where: { isActive: true },
      order: [["id", "ASC"]],
    });
  }

  async findById(
    id: number,
    transaction?: Transaction,
    onlyActive = true
  ): Promise<ModuleI | null> {
    return Module.findOne({
      where: {
        id,
        ...(onlyActive ? { isActive: true } : {}),
      },
      transaction,
    });
  }

  async create(
    data: Partial<ModuleI>,
    transaction?: Transaction
  ): Promise<ModuleI> {
    return Module.create(data as any, { transaction });
  }

  async update(
    id: number,
    data: Partial<ModuleI>,
    transaction?: Transaction
  ): Promise<ModuleI | null> {
    const module = await Module.findByPk(id, {
      transaction,
    });

    if (!module) {
      return null;
    }

    await module.update(data, { transaction });

    return module;
  }

  async delete(
    id: number,
    transaction?: Transaction
  ): Promise<number> {
    return Module.destroy({
      where: { id },
      transaction,
    });
  }
}
