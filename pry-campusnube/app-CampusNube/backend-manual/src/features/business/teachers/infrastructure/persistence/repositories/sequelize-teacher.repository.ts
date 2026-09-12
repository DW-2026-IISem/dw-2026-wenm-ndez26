import { Injectable } from '@nestjs/common';

import { TeacherEntity } from '../../../domain/entities/teacher.entity.js';
import {
  ITeacherRepository,
  TEACHER_REPOSITORY,
  TeacherUpdateData,
} from '../../../domain/interfaces/teacher-repository.interface.js';

import { TeacherModel } from '../models/teacher.model.js';

@Injectable()
export class SequelizeTeacherRepository implements ITeacherRepository {
  async create(teacher: TeacherEntity): Promise<TeacherEntity> {
    const model = await TeacherModel.create({
      name: teacher.getName(),
      description: teacher.getDescription() ?? null,
      isActive: teacher.getIsActive(),
    });

    return this.toDomain(model);
  }

  async findAll(): Promise<TeacherEntity[]> {
    const models = await TeacherModel.findAll({
      order: [['name', 'ASC']],
    });

    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<TeacherEntity | null> {
    const model = await TeacherModel.findByPk(id);

    return model ? this.toDomain(model) : null;
  }

  async update(
    id: number,
    data: TeacherUpdateData,
  ): Promise<TeacherEntity> {
    const model = await TeacherModel.findByPk(id);

    if (!model) {
      throw new Error(`Teacher ${id} not found`);
    }

    await model.update(data);

    return this.toDomain(model);
  }

  async delete(id: number): Promise<void> {
    await TeacherModel.destroy({
      where: { id },
    });
  }

  private toDomain(model: TeacherModel): TeacherEntity {
    return new TeacherEntity({
      id: model.id,
      name: model.name,
      description: model.description ?? undefined,
      isActive: model.isActive,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    });
  }
}

export const teacherRepositoryProvider = {
  provide: TEACHER_REPOSITORY,
  useClass: SequelizeTeacherRepository,
};
