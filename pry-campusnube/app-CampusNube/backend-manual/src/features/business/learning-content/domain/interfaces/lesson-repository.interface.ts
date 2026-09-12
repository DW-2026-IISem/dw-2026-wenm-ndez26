import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Lesson } from '../entities/lesson.entity.js';

export const LESSON_REPOSITORY = 'LESSON_REPOSITORY';

export interface LessonFindAllParams {
  page?: number;
  limit?: number;
  moduleId?: number;
  name?: string;
}

export interface ILessonRepository {
  create(lesson: Lesson): Promise<Lesson>;
  update(lesson: Lesson): Promise<Lesson>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Lesson | null>;
  findAll(
    params: LessonFindAllParams,
  ): Promise<PaginatedResult<Lesson>>;
}
