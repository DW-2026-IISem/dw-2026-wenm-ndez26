
import { Status, Timestamps } from './api.model';
import { HttpMethod } from './resource.model';

export interface ResourceRole extends Timestamps {
  id: number;
  role_id: number;
  resource_id: number;
  status: Status;
}

export interface ResourceRolePayload {
  role_id: number;
  resource_id: number;
  status?: Status;
}

export interface ResourceRoleUpdatePayload {
  role_id?: number;
  resource_id?: number;
}

/**
 * Información auxiliar para representar permisos en pantalla.
 * No implica que el backend devuelva relaciones incluidas.
 */
export interface ResourceRoleDetail {
  role_id: number;
  resource_id: number;
  method: HttpMethod;
  path: string;
}
