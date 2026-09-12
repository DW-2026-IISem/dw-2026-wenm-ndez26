import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';

import { Lesson } from '../../../domain/entities/lesson.entity.js';
import {
  type ILessonRepository,
  type LessonFindAllParams,
} from '../../../domain/interfaces/lesson-repository.interface.js';

import { LessonModel } from '../models/lesson.model.js';

@Injectable()
export class LessonRepository implements ILessonRepository {
  async create(lesson: Lesson): Promise<Lesson> {
    const model = await LessonModel.create({
      moduleId: lesson.moduleId,
      name: lesson.name,
      description: lesson.description,
      content: lesson.content,
      order: lesson.order,
      status: lesson.status,
    });

    return Lesson.reconstitute(model.toJSON());
  }

  async update(lesson: Lesson): Promise<Lesson> {
    await LessonModel.update(
      {
        moduleId: lesson.moduleId,
        name: lesson.name,
        description: lesson.description,
        content: lesson.content,
        order: lesson.order,
        status: lesson.status,
      },
      {
        where: { id: lesson.id },
      },
    );

    const updated = await LessonModel.findByPk(
      lesson.id!,
    );

    if (!updated) {
      throw new Error(
        `Lección con id '${lesson.id}' no encontrada después de actualizar`,
      );
    }

    return Lesson.reconstitute(updated.toJSON());
  }

  async delete(id: number): Promise<void> {
    await LessonModel.destroy({
      where: { id },
    });
  }

  async findById(id: number): Promise<Lesson | null> {
    const model = await LessonModel.findByPk(id);

    return model
      ? Lesson.reconstitute(model.toJSON())
      : null;
  }

  async findAll(params: LessonFindAllParams) {
    const { page, limit, offset } =
      normalizePagination(
        params.page,
        params.limit,
      );

    const where: any = {};

    if (params.moduleId) {
      where.moduleId = params.moduleId;
    }

    if (params.name) {
      where.name = {
        [Op.like]: `%${params.name}%`,
      };
    }

    const { rows, count } =
      await LessonModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [['order', 'ASC']],
      });

    return buildPaginatedResult(
      rows.map((row) =>
        Lesson.reconstitute(row.toJSON()),
      ),
      count,
      page,
      limit,
    );
  }
}
