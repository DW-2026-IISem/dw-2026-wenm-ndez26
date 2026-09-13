import { SubmissionEntity } from '../entities/submission.entity.js';

export const SUBMISSION_REPOSITORY = 'SUBMISSION_REPOSITORY';

export interface SubmissionFindAllParams {
  referenceId?: number;
  status?: string;
}

export interface SubmissionUpdateData {
  referenceId?: number;
  startDate?: Date;
  endDate?: Date;
  total?: number;
  status?: string;
  observations?: string;
}

export interface ISubmissionRepository {
  create(submission: SubmissionEntity): Promise<SubmissionEntity>;
  findAll(
    params?: SubmissionFindAllParams,
  ): Promise<SubmissionEntity[]>;
  findById(id: number): Promise<SubmissionEntity | null>;
  findByReferenceId(referenceId: number): Promise<SubmissionEntity[]>;
  update(
    id: number,
    data: SubmissionUpdateData,
  ): Promise<SubmissionEntity>;
  delete(id: number): Promise<void>;
}
