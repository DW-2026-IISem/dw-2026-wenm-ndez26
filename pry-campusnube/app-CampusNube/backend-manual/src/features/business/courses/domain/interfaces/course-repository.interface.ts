import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Course } from '../entities/course.entity.js';

export const COURSE_REPOSITORY = 'COURSE_REPOSITORY';

export interface CourseFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ICourseRepository {
  create(course: Course): Promise<Course>;
  update(course: Course): Promise<Course>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Course | null>;
  findByName(name: string): Promise<Course | null>;
  findAll(params: CourseFindAllParams): Promise<PaginatedResult<Course>>;
}
