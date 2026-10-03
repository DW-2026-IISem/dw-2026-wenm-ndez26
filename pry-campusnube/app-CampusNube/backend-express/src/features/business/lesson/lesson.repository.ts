import { Lesson } from "./lesson.model";
import {
  CreateLessonDto,
  UpdateLessonDto,
} from "./dto";

export class LessonRepository {
  async findAll(): Promise<Lesson[]> {
    return Lesson.findAll({
      where: {
        isActive: true,
      },
    });
  }

  async findById(id: number): Promise<Lesson | null> {
    return Lesson.findOne({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async create(data: CreateLessonDto): Promise<Lesson> {
  return Lesson.create({
    module_id: data.module_id,
    name: data.name,
    description: data.description ?? null,
    isActive: data.isActive ?? true,
  });
}

  async update(
    lesson: Lesson,
    data: UpdateLessonDto
  ): Promise<Lesson> {
    await lesson.update(data);
    return lesson;
  }

  async patch(
    lesson: Lesson,
    data: Partial<UpdateLessonDto>
  ): Promise<Lesson> {
    await lesson.update(data);
    return lesson;
  }

  async delete(lesson: Lesson): Promise<void> {
    await lesson.destroy();
  }

  async deactivate(lesson: Lesson): Promise<Lesson> {
    await lesson.update({
      isActive: false,
    });

    return lesson;
  }
}