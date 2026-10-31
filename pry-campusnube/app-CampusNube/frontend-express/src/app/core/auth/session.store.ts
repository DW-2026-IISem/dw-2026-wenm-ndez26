import { Injectable, computed, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

import {
  EffectivePermission,
  SessionHttpMethod,
  SessionTokens,
  SessionUser,
  StoredSession
} from '../models/auth.model';

const STORAGE_KEY = 'campusnube.session.v1';

@Injectable({
  providedIn: 'root'
})
export class SessionStore {
  private readonly _accessToken = signal<string | null>(null);
  private readonly _refreshToken = signal<string | null>(null);
  private readonly _user = signal<SessionUser | null>(null);
  private readonly _permissions = signal<EffectivePermission[]>([]);

  readonly accessToken = this._accessToken.asReadonly();
  readonly refreshToken = this._refreshToken.asReadonly();
  readonly user = this._user.asReadonly();
  readonly permissions = this._permissions.asReadonly();

  readonly authEnabled = environment.requireAuth;

  readonly isAuthenticated = computed(
    () => !!this._accessToken() && !!this._user()
  );

  readonly permissionCount = computed(
    () => this._permissions().length
  );

  readonly roleNames = computed(() =>
    [...new Set(
      this._permissions().map(permission => permission.role_name)
    )]
  );

  readonly roleLabel = computed(
    () => this.roleNames().join(', ') || 'Sin rol asignado'
  );

  constructor() {
    this.restore();
  }

  setTokens(tokens: SessionTokens): void {
    this._accessToken.set(tokens.access_token);
    this._refreshToken.set(tokens.refresh_token);
    this.persist();
  }

  setAccess(
    user: SessionUser,
    permissions: EffectivePermission[]
  ): void {
    this._user.set(user);
    this._permissions.set(permissions);
    this.persist();
  }

  clear(): void {
    this._accessToken.set(null);
    this._refreshToken.set(null);
    this._user.set(null);
    this._permissions.set([]);

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  hasRole(roleName: string): boolean {
    return this.roleNames().includes(roleName);
  }

  canPermission(permission: string): boolean {
    if (!this.authEnabled) {
      return true;
    }

    const separator = permission.indexOf(' ');

    if (separator === -1) {
      return false;
    }

    const method = permission.substring(0, separator).toUpperCase();
    const path = permission.substring(separator + 1).trim();

    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    if (!allowedMethods.includes(method) || !path.startsWith('/')) {
      return false;
    }

    return this.can(method as SessionHttpMethod, path);
  }

  can(method: SessionHttpMethod, path: string): boolean {
    if (!this.authEnabled) {
      return true;
    }

    return this._permissions().some(permission =>
      permission.method === method &&
      this.pathMatches(permission.path, path)
    );
  }

  private pathMatches(pattern: string, path: string): boolean {
    const normalizedPattern = pattern.split('?')[0].replace(/\/$/, '');
    const normalizedPath = path.split('?')[0].replace(/\/$/, '');

    const expression = normalizedPattern
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/:[^/]+/g, '[^/]+');

    return new RegExp(`^${expression}$`).test(normalizedPath);
  }

  private restore(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (!raw) {
        return;
      }

      const session = JSON.parse(raw) as StoredSession;

      this._accessToken.set(session.accessToken || null);
      this._refreshToken.set(session.refreshToken || null);
      this._user.set(session.user || null);
      this._permissions.set(session.permissions || []);
    } catch {
      this.clear();
    }
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }

    const session: StoredSession = {
      accessToken: this._accessToken() || '',
      refreshToken: this._refreshToken() || '',
      user: this._user(),
      permissions: this._permissions()
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
}
