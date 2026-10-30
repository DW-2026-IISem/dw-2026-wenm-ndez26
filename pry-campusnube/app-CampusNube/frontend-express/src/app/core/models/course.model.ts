import { Timestamps } from './api.model';
import { Teacher } from './teacher.model';

export interface Course extends Timestamps {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  teachers?: Teacher[];
}

export interface CoursePayload {
  name: string;
  description?: string | null;
  isActive?: boolean;
  teacherIds?: number[];
}

export interface CourseUpdatePayload {
  name?: string;
  description?: string | null;
  teacherIds?: number[];
}
