import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';

import {
  buildPaginatedResult,
  normalizePagination,
} from '../../../../../../common/utils/pagination.util.js';

import { Enrollment } from '../../../domain/entities/enrollment.entity.js';
import {
  type EnrollmentFindAllParams,
  type IEnrollmentRepository,
} from '../../../domain/interfaces/enrollment-repository.interface.js';

import { EnrollmentModel } from '../models/enrollment.model.js';

@Injectable()
export class EnrollmentRepository implements IEnrollmentRepository {
  async create(enrollment: Enrollment): Promise<Enrollment> {
    const model = await EnrollmentModel.create({
      apprenticeId: enrollment.apprenticeId,
      courseId: enrollment.courseId,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt ?? new Date(),
    });

    return Enrollment.reconstitute(model.toJSON());
  }

  async update(enrollment: Enrollment): Promise<Enrollment> {
    await EnrollmentModel.update(
      {
        apprenticeId: enrollment.apprenticeId,
        courseId: enrollment.courseId,
        status: enrollment.status,
        enrolledAt: enrollment.enrolledAt,
      },
      {
        where: { id: enrollment.id },
      },
    );

    const updated = await EnrollmentModel.findByPk(enrollment.id!);

    return Enrollment.reconstitute(updated!.toJSON());
  }

  async delete(id: number): Promise<void> {
    await EnrollmentModel.destroy({
      where: { id },
    });
  }

  async findById(id: number): Promise<Enrollment | null> {
    const model = await EnrollmentModel.findByPk(id);

    return model
      ? Enrollment.reconstitute(model.toJSON())
      : null;
  }

  async findByApprenticeAndCourse(
    apprenticeId: number,
    courseId: number,
  ): Promise<Enrollment | null> {
    const model = await EnrollmentModel.findOne({
      where: {
        apprenticeId,
        courseId,
      },
    });

    return model
      ? Enrollment.reconstitute(model.toJSON())
      : null;
  }

  async findAll(params: EnrollmentFindAllParams) {
    const { page, limit, offset } = normalizePagination(
      params.page,
      params.limit,
    );

    const where: any = {};

    if (params.apprenticeId) {
      where.apprenticeId = params.apprenticeId;
    }

    if (params.courseId) {
      where.courseId = params.courseId;
    }

    const { rows, count } =
      await EnrollmentModel.findAndCountAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

    return buildPaginatedResult(
      rows.map((row) =>
        Enrollment.reconstitute(row.toJSON()),
      ),
      count,
      page,
      limit,
    );
  }
}
