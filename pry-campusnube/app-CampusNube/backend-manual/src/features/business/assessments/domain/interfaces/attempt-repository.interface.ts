import { AttemptEntity } from '../entities/attempt.entity.js';

export const ATTEMPT_REPOSITORY = 'ATTEMPT_REPOSITORY';

export interface AttemptFindAllParams {
  enrollmentId?: number;
}

export interface AttemptUpdateData {
  enrollmentId?: number;
  name?: string;
  description?: string;
  isActive?: import('../../../../../common/enums/status.enum.js').Status;
}

export interface IAttemptRepository {
  create(attempt: AttemptEntity): Promise<AttemptEntity>;
  findAll(params?: AttemptFindAllParams): Promise<AttemptEntity[]>;
  findById(id: number): Promise<AttemptEntity | null>;
  findByEnrollmentId(enrollmentId: number): Promise<AttemptEntity[]>;
  update(id: number, data: AttemptUpdateData): Promise<AttemptEntity>;
  delete(id: number): Promise<void>;
}
