import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';

import { Apprentice } from '../../../domain/entities/apprentice.entity.js';
import {
  type ApprenticeFindAllParams,
  type IApprenticeRepository,
} from '../../../domain/interfaces/apprentice-repository.interface.js';

import { ApprenticeModel } from '../models/apprentice.model.js';

@Injectable()
export class ApprenticeRepository implements IApprenticeRepository {
  async create(apprentice: Apprentice): Promise<Apprentice> {
    const model = await ApprenticeModel.create({
      name: apprentice.name,
      description: apprentice.description,
      status: apprentice.status,
    });

    return Apprentice.reconstitute(model.toJSON());
  }

  async update(apprentice: Apprentice): Promise<Apprentice> {
    await ApprenticeModel.update(
      {
        name: apprentice.name,
        description: apprentice.description,
        status: apprentice.status,
      },
      {
        where: { id: apprentice.id },
      },
    );

    const updated = await ApprenticeModel.findByPk(apprentice.id!);

    if (!updated) {
      throw new Error(
        `Aprendiz con id '${apprentice.id}' no encontrado después de actualizar`,
      );
    }

    return Apprentice.reconstitute(updated.toJSON());
  }

  async delete(id: number): Promise<void> {
    await ApprenticeModel.destroy({
      where: { id },
    });
  }

  async findById(id: number): Promise<Apprentice | null> {
    const model = await ApprenticeModel.findByPk(id);

    return model
      ? Apprentice.reconstitute(model.toJSON())
      : null;
  }

  async findAll(params: ApprenticeFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where: any = {};

    if (params.name) {
      where.name = {
        [Op.like]: `%${params.name}%`,
      };
    }

    const { rows, count } =
      await ApprenticeModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

    return buildPaginatedResult(
      rows.map((row) =>
        Apprentice.reconstitute(row.toJSON()),
      ),
      count,
      page,
      limit,
    );
  }
}
