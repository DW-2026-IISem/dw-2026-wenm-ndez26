
import { Timestamps } from './api.model';

export interface Attempt extends Timestamps {
  id: number;
  enrollment_id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface AttemptPayload {
  enrollment_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface AttemptUpdatePayload {
  enrollment_id?: number;
  name?: string;
  description?: string | null;
}
