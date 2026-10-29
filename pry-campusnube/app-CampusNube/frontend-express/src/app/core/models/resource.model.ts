
import { Status, Timestamps } from './api.model';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const HTTP_METHODS: HttpMethod[] = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
];

export interface Resource extends Timestamps {
  id: number;
  method: string;
  path: string;
  description: string | null;
  status: Status;
}

export interface ResourcePayload {
  method: HttpMethod;
  path: string;
  description?: string | null;
  status?: Status;
}

export interface ResourceUpdatePayload {
  method?: HttpMethod;
  path?: string;
  description?: string | null;
}
