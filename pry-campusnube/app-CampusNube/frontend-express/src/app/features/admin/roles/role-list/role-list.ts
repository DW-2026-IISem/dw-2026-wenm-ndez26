import { Component, inject, signal } from '@angular/core';

import { RoleApi } from '../role-api';
import { RoleForm } from '../role-form/role-form';

import { Role, RolePayload, RoleUpdatePayload } from '../../../../core/models/role.model';

import { SessionStore } from '../../../../core/auth/session.store';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [RoleForm],
  templateUrl: './role-list.html',
  styleUrl: './role-list.css',
})
export class RoleList {
  private readonly roleApi = inject(RoleApi);
  private readonly session = inject(SessionStore);

  readonly roles = signal<Role[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly showForm = signal(false);
  readonly editingRole = signal<Role | null>(null);

  canList(): boolean {
    return this.session.can('GET', '/api/roles');
  }

  canCreate(): boolean {
    return this.session.can('POST', '/api/roles');
  }

  canEdit(role: Role): boolean {
    return this.session.can('PATCH', `/api/roles/${role.id}`);
  }

  canDeactivate(role: Role): boolean {
    return this.session.can('PATCH', `/api/roles/${role.id}/deactivate`);
  }

  canDelete(role: Role): boolean {
    return this.session.can('DELETE', `/api/roles/${role.id}`);
  }

  loadRoles(): void {
    if (!this.canList()) {
      this.error.set('No tienes permiso para consultar los roles.');
      return;
    }

    this.loading.set(true);
    this.error.set('');
    this.message.set('');

    this.roleApi.list().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible cargar los roles.');
        this.loading.set(false);
      },
    });
  }

  constructor() {
    this.loadRoles();
  }

  openCreate(): void {
    if (!this.canCreate()) return;

    this.editingRole.set(null);
    this.showForm.set(true);
    this.error.set('');
    this.message.set('');
  }

  openEdit(role: Role): void {
    if (!this.canEdit(role)) return;

    this.editingRole.set(role);
    this.showForm.set(true);
    this.error.set('');
    this.message.set('');
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingRole.set(null);
  }

  save(payload: RolePayload | RoleUpdatePayload): void {
    const current = this.editingRole();

    this.error.set('');
    this.message.set('');

    const request = current
      ? this.roleApi.update(current.id, payload as RoleUpdatePayload)
      : this.roleApi.create(payload as RolePayload);

    request.subscribe({
      next: () => {
        this.closeForm();
        this.message.set(current ? 'Rol actualizado correctamente.' : 'Rol creado correctamente.');
        this.loadRoles();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible guardar el rol.');
      },
    });
  }

  deactivate(role: Role): void {
    if (!this.canDeactivate(role)) return;

    if (!window.confirm(`¿Deseas dar de baja el rol ${role.name}?`)) return;

    this.roleApi.deactivate(role.id).subscribe({
      next: () => {
        this.message.set(`El rol ${role.name} fue dado de baja.`);
        this.loadRoles();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible desactivar el rol.');
      },
    });
  }

  remove(role: Role): void {
    if (!this.canDelete(role)) return;

    if (
      !window.confirm(
        `¿Deseas eliminar definitivamente el rol ${role.name}? Verifica antes que no tenga asignaciones activas.`,
      )
    )
      return;

    this.roleApi.remove(role.id).subscribe({
      next: () => {
        this.message.set(`El rol ${role.name} fue eliminado.`);
        this.loadRoles();
      },
      error: (err) => {
        this.error.set(
          err.error?.message || 'No fue posible eliminar el rol. Verifica sus asignaciones.',
        );
      },
    });
  }
}
