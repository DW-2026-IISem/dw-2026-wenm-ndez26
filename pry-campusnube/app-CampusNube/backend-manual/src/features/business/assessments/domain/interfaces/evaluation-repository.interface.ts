import { EvaluationEntity } from '../entities/evaluation.entity.js';

export const EVALUATION_REPOSITORY = 'EVALUATION_REPOSITORY';

export interface EvaluationFindAllParams {
  courseId?: number;
}

export interface EvaluationUpdateData {
  courseId?: number;
  name?: string;
  description?: string;
  isActive?: import('../../../../../common/enums/status.enum.js').Status;
}

export interface IEvaluationRepository {
  create(evaluation: EvaluationEntity): Promise<EvaluationEntity>;
  findAll(params?: EvaluationFindAllParams): Promise<EvaluationEntity[]>;
  findById(id: number): Promise<EvaluationEntity | null>;
  findByCourseId(courseId: number): Promise<EvaluationEntity[]>;
  update(
    id: number,
    data: EvaluationUpdateData,
  ): Promise<EvaluationEntity>;
  delete(id: number): Promise<void>;
}
