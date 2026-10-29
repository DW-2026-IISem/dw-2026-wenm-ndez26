
import { Status, Timestamps } from './api.model';

export interface User extends Timestamps {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  status: Status;
}

export interface UserPayload {
  username: string;
  email: string;
  password: string;
  avatar?: string | null;
  status?: Status;
}

export interface UserUpdatePayload {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
}
