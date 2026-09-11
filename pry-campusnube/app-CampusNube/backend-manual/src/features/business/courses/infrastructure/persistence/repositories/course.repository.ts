import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';

import { Course } from '../../../domain/entities/course.entity.js';
import {
  CourseFindAllParams,
  ICourseRepository,
} from '../../../domain/interfaces/course-repository.interface.js';

import { CourseModel } from '../models/course.model.js';

@Injectable()
export class CourseRepository implements ICourseRepository {
  async create(course: Course): Promise<Course> {
    const model = await CourseModel.create({
      name: course.name,
      description: course.description ?? null,
      status: course.status,
    });

    return Course.reconstitute(model.toJSON());
  }

  async update(course: Course): Promise<Course> {
    await CourseModel.update(
      {
        name: course.name,
        description: course.description ?? null,
        status: course.status,
      },
      {
        where: { id: course.id },
      },
    );

    const updated = await CourseModel.findByPk(course.id!);

    return Course.reconstitute(updated!.toJSON());
  }

  async delete(id: number): Promise<void> {
    await CourseModel.destroy({
      where: { id },
    });
  }

  async findById(id: number): Promise<Course | null> {
    const model = await CourseModel.findByPk(id);

    return model ? Course.reconstitute(model.toJSON()) : null;
  }

  async findByName(name: string): Promise<Course | null> {
    const model = await CourseModel.findOne({
      where: { name },
    });

    return model ? Course.reconstitute(model.toJSON()) : null;
  }

  async findAll(params: CourseFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where = params.search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${params.search}%` } },
            { description: { [Op.like]: `%${params.search}%` } },
          ],
        }
      : {};

    const { rows, count } = await CourseModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return buildPaginatedResult(
      rows.map((row) => Course.reconstitute(row.toJSON())),
      count,
      page,
      limit,
    );
  }
}
