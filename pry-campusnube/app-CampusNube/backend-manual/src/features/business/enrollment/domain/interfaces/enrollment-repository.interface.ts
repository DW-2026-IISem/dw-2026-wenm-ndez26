import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Enrollment } from '../entities/enrollment.entity.js';

export const ENROLLMENT_REPOSITORY = 'ENROLLMENT_REPOSITORY';

export interface EnrollmentFindAllParams {
  page?: number;
  limit?: number;
  apprenticeId?: number;
  courseId?: number;
}

export interface IEnrollmentRepository {
  create(enrollment: Enrollment): Promise<Enrollment>;
  update(enrollment: Enrollment): Promise<Enrollment>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Enrollment | null>;
  findByApprenticeAndCourse(
    apprenticeId: number,
    courseId: number,
  ): Promise<Enrollment | null>;
  findAll(
    params: EnrollmentFindAllParams,
  ): Promise<PaginatedResult<Enrollment>>;
}
