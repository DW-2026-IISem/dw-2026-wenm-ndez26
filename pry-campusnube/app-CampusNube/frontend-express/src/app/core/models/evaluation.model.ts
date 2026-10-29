
import { Timestamps } from './api.model';

export interface Evaluation extends Timestamps {
  id: number;
  course_id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface EvaluationPayload {
  course_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface EvaluationUpdatePayload {
  course_id?: number;
  name?: string;
  description?: string | null;
}
