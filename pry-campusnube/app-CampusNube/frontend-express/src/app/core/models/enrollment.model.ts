import { Timestamps } from './api.model';
import { Status } from './api.model';

export interface Enrollment extends Timestamps {
  id: number;
  learner_id: number;
  course_id: number;
  enrollment_date: string;
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
  status: Status;
}

export interface EnrollmentPayload {
  learner_id: number;
  course_id: number;
  enrollment_date?: string;
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
  status?: Status;
}

export interface EnrollmentUpdatePayload {
  learner_id?: number;
  course_id?: number;
  enrollment_date?: string;
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
  status?: Status;
}
