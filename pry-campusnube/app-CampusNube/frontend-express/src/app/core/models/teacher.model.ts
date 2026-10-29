
import { Timestamps } from './api.model';

export interface Teacher extends Timestamps {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface TeacherPayload {
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface TeacherUpdatePayload {
  name?: string;
  description?: string | null;
}
