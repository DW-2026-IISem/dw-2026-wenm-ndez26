
import { Timestamps } from './api.model';

export interface Certificate extends Timestamps {
  id: number;
  enrollment_id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

export interface CertificatePayload {
  enrollment_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface CertificateUpdatePayload {
  name?: string;
  description?: string | null;
}
