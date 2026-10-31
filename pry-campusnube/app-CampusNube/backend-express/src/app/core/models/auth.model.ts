import { User } from './user.model';

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface SessionTokens {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export type SessionUser = Pick<
  User,
  'id' | 'username' | 'email' | 'avatar' | 'status'
>;

export interface ProfilePayload {
  user: SessionUser;
}

export type SessionHttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

export interface EffectivePermission {
  resource_id: number;
  method: SessionHttpMethod;
  path: string;
  description: string | null;
  role_id: number;
  role_name: string;
}

export interface PermissionsPayload {
  permissions: EffectivePermission[];
}

export interface AccessPayload {
  user: SessionUser;
  permissions: EffectivePermission[];
}

export interface StoredSession {
  accessToken: string;
  refreshToken: string;
  user: SessionUser | null;
  permissions: EffectivePermission[];
}
