
import { Timestamps } from './api.model';

export interface Lesson extends Timestamps {
  id: number;
  module_id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface LessonPayload {
  module_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface LessonUpdatePayload {
  module_id?: number;
  name?: string;
  description?: string | null;
}
