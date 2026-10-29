
import { Timestamps } from './api.model';

export interface Progress extends Timestamps {
  id: number;
  enrollment_id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface ProgressPayload {
  enrollment_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface ProgressUpdatePayload {
  enrollment_id?: number;
  name?: string;
  description?: string | null;
}
