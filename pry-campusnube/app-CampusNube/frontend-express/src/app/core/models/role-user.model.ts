
import { Status, Timestamps } from './api.model';

export interface RoleUser extends Timestamps {
  id: number;
  user_id: number;
  role_id: number;
  status: Status;
}

export interface RoleUserPayload {
  user_id: number;
  role_id: number;
  status?: Status;
}

export interface RoleUserUpdatePayload {
  user_id?: number;
  role_id?: number;
}
