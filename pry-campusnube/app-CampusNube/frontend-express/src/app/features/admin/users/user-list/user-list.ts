import { Component, computed, inject, signal } from '@angular/core';
import { UserApi } from '../user-api';
import { User } from '../../../../core/models/user.model';
import { UserPayload, UserUpdatePayload } from '../../../../core/models/user.model';
import { EffectivePermission } from '../../../../core/models/auth.model';
import { SessionStore } from '../../../../core/auth/session.store';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserForm],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  private readonly userApi = inject(UserApi);
  private readonly session = inject(SessionStore);

  readonly users = signal<User[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly showForm = signal(false);
  readonly editingUser = signal<User | null>(null);

  readonly access = signal<EffectivePermission[]>([]);
  readonly accessUser = signal<User | null>(null);
  readonly accessLoading = signal(false);
  readonly accessError = signal('');

  readonly accessRoles = computed(() => {
    const byId = new Map<number, string>();

    for (const permission of this.access()) {
      byId.set(permission.role_id, permission.role_name);
    }

    return [...byId.entries()].map(([id, name]) => ({ id, name }));
  });

  constructor() {
    this.loadUsers();
  }

  isSelf(user: User): boolean {
    return this.session.user()?.id === user.id;
  }

  canCreate(): boolean {
    return this.session.can('POST', '/api/usuarios');
  }

  canEdit(user: User): boolean {
    return this.session.can('PATCH', `/api/usuarios/${user.id}`);
  }

  canDeactivate(user: User): boolean {
    return this.session.can('PATCH', `/api/usuarios/${user.id}/deactivate`);
  }

  canDelete(user: User): boolean {
    return this.session.can('DELETE', `/api/usuarios/${user.id}`);
  }

  canViewPermissions(user: User): boolean {
    return this.session.can('GET', `/api/usuarios/${user.id}/permisos`);
  }

  loadUsers(): void {
    this.loading.set(true);
    this.error.set('');

    this.userApi.list().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No fue posible cargar los usuarios.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.editingUser.set(null);
    this.showForm.set(true);
    this.error.set('');
    this.message.set('');
  }

  openEdit(user: User): void {
    this.editingUser.set(user);
    this.showForm.set(true);
    this.error.set('');
    this.message.set('');
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingUser.set(null);
  }

  save(payload: UserPayload): void {
    const current = this.editingUser();

    if (current) {
      const updatePayload: UserUpdatePayload = {
        username: payload.username,
        email: payload.email,
        avatar: payload.avatar,
      };

      this.userApi.update(current.id, updatePayload).subscribe({
        next: () => {
          this.message.set('Usuario actualizado correctamente.');
          this.closeForm();
          this.loadUsers();
        },
        error: (err) => {
          this.error.set(err.error?.message || 'No fue posible actualizar el usuario.');
        },
      });

      return;
    }

    this.userApi.create(payload).subscribe({
      next: () => {
        this.message.set('Usuario creado correctamente.');
        this.closeForm();
        this.loadUsers();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible crear el usuario.');
      },
    });
  }

  deactivate(user: User): void {
    if (!window.confirm(`¿Deseas desactivar al usuario ${user.username}?`)) {
      return;
    }

    this.userApi.deactivate(user.id).subscribe({
      next: () => {
        this.message.set('Usuario desactivado correctamente.');
        this.loadUsers();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible desactivar el usuario.');
      },
    });
  }

  remove(user: User): void {
    if (this.isSelf(user)) {
      this.error.set('No puedes eliminar tu propio usuario.');
      return;
    }

    if (!window.confirm(`¿Deseas eliminar al usuario ${user.username}?`)) {
      return;
    }

    this.userApi.remove(user.id).subscribe({
      next: () => {
        this.message.set('Usuario eliminado correctamente.');
        this.loadUsers();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible eliminar el usuario.');
      },
    });
  }

  viewPermissions(user: User): void {
    this.accessUser.set(user);
    this.access.set([]);
    this.accessError.set('');
    this.accessLoading.set(true);

    this.userApi.permissions(user.id).subscribe({
      next: (permissions) => {
        this.access.set(permissions);
        this.accessLoading.set(false);
      },
      error: () => {
        this.accessError.set('No fue posible consultar los permisos de este usuario.');
        this.accessLoading.set(false);
      },
    });
  }

  closePermissions(): void {
    this.accessUser.set(null);
    this.access.set([]);
    this.accessError.set('');
  }
}
