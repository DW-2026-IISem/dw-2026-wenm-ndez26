import { ProgressEntity } from '../entities/progress.entity.js';

export const PROGRESS_REPOSITORY = 'PROGRESS_REPOSITORY';

export interface ProgressFindAllParams {
  enrollmentId?: number;
  page?: number;
  limit?: number;
}

export interface ProgressUpdateData {
  enrollmentId?: number;
  name?: string;
  description?: string;
  isActive?: string;
}

export interface IProgressRepository {
  create(progress: ProgressEntity): Promise<ProgressEntity>;
  findAll(params?: ProgressFindAllParams): Promise<ProgressEntity[]>;
  findById(id: number): Promise<ProgressEntity | null>;
  findByEnrollmentId(enrollmentId: number): Promise<ProgressEntity[]>;
  update(id: number, data: ProgressUpdateData): Promise<ProgressEntity>;
  delete(id: number): Promise<void>;
}
