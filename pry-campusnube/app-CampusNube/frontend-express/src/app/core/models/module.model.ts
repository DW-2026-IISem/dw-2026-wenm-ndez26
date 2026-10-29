
import { Timestamps } from './api.model';

export interface Module extends Timestamps {
  id: number;
  course_id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface ModulePayload {
  course_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface ModuleUpdatePayload {
  course_id?: number;
  name?: string;
  description?: string | null;
}
