import { PaginatedResult } from '../../../../../common/interfaces/pagination.interface.js';
import { Apprentice } from '../entities/apprentice.entity.js';

export const APPRENTICE_REPOSITORY = 'APPRENTICE_REPOSITORY';

export interface ApprenticeFindAllParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IApprenticeRepository {
  create(apprentice: Apprentice): Promise<Apprentice>;
  update(apprentice: Apprentice): Promise<Apprentice>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Apprentice | null>;
  findAll(
    params: ApprenticeFindAllParams,
  ): Promise<PaginatedResult<Apprentice>>;
}
