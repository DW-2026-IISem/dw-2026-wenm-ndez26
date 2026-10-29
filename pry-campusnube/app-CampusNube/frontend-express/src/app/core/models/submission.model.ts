
import { Money, Timestamps } from './api.model';

export interface Submission extends Timestamps {
  id: number;
  referencia_id: number;
  lesson_id: number;
  enrollment_id: number;
  fecha_inicio: string;
  fecha_fin: string | null;
  total: Money | null;
  estado: string;
  observaciones: string | null;
}

export interface SubmissionPayload {
  referencia_id: number;
  lesson_id: number;
  enrollment_id: number;
  fecha_inicio: string;
  fecha_fin?: string | null;
  total?: Money | null;
  estado: string;
  observaciones?: string | null;
}

export interface SubmissionUpdatePayload {
  fecha_fin?: string | null;
  total?: Money | null;
  estado?: string;
  observaciones?: string | null;
}
