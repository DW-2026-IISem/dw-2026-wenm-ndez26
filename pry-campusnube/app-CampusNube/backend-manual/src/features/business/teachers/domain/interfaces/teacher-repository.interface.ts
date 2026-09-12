import { TeacherEntity } from '../entities/teacher.entity.js';

export const TEACHER_REPOSITORY = 'TEACHER_REPOSITORY';

export interface TeacherUpdateData {
  name?: string;
  description?: string;
  isActive?: import('../../../../../common/enums/status.enum.js').Status;
}

export interface ITeacherRepository {
  create(teacher: TeacherEntity): Promise<TeacherEntity>;
  findAll(): Promise<TeacherEntity[]>;
  findById(id: number): Promise<TeacherEntity | null>;
  update(id: number, data: TeacherUpdateData): Promise<TeacherEntity>;
  delete(id: number): Promise<void>;
}
