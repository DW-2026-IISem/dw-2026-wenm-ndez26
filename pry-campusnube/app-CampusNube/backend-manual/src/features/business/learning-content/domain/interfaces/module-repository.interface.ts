import { ModuleEntity } from '../entities/module.entity.js';

export const MODULE_REPOSITORY = 'MODULE_REPOSITORY';

export interface ModuleFindAllParams {
  courseId?: number;
  page?: number;
  limit?: number;
}

export interface ModuleUpdateData {
  courseId?: number;
  title?: string;
  description?: string;
  order?: number;
}

export interface IModuleRepository {
  create(module: ModuleEntity): Promise<ModuleEntity>;
  findAll(params?: ModuleFindAllParams): Promise<ModuleEntity[]>;
  findById(id: number): Promise<ModuleEntity | null>;
  findByCourseId(courseId: number): Promise<ModuleEntity[]>;
  update(id: number, data: ModuleUpdateData): Promise<ModuleEntity>;
  delete(id: number): Promise<void>;
}
