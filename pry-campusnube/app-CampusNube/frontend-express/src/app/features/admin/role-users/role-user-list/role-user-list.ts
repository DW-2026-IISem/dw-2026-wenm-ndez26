import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';

import { RoleUserApi } from '../role-user-api';
import { RoleUser } from '../../../../core/models/role-user.model';
import { User } from '../../../../core/models/user.model';
import { Role } from '../../../../core/models/role.model';
import { UserApi } from '../../users/user-api';
import { RoleApi } from '../../roles/role-api';

@Component({
  selector: 'app-role-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, DialogModule],
  styleUrl: './role-user-list.css',
  templateUrl: './role-user-list.html',
})
export class RoleUserList {
  private readonly assignmentApi = inject(RoleUserApi);
  private readonly userApi = inject(UserApi);
  private readonly roleApi = inject(RoleApi);

  readonly rows = signal<RoleUser[]>([]);
  readonly users = signal<User[]>([]);
  readonly roles = signal<Role[]>([]);

  readonly loading = signal(false);
  readonly reactivating = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedUser = signal<User | null>(null);
  readonly selectedRole = signal<Role | null>(null);

  readonly userFilter = signal<User | null>(null);
  readonly roleFilter = signal<Role | null>(null);

  readonly visibleRows = computed(() => {
    const user = this.userFilter();
    const role = this.roleFilter();

    return this.rows().filter(
      (row) => (!user || row.user_id === user.id) && (!role || row.role_id === role.id),
    );
  });

  readonly canSave = computed(() => !!this.selectedUser() && !!this.selectedRole());

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      assignments: this.assignmentApi.list(true),
      users: this.userApi.list(),
      roles: this.roleApi.list(),
    }).subscribe({
      next: (result) => {
        this.rows.set(result.assignments);
        this.users.set(result.users);
        this.roles.set(result.roles);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible cargar las asignaciones.');
        this.loading.set(false);
      },
    });
  }

  userFor(row: RoleUser): User | undefined {
    return this.users().find((user) => user.id === row.user_id);
  }

  roleFor(row: RoleUser): Role | undefined {
    return this.roles().find((role) => role.id === row.role_id);
  }

  openDialog(): void {
    this.selectedUser.set(null);
    this.selectedRole.set(null);
    this.error.set('');
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
  }

  save(): void {
    const user = this.selectedUser();
    const role = this.selectedRole();

    if (!user || !role) return;

    this.assignmentApi
      .create({
        user_id: user.id,
        role_id: role.id,
      })
      .subscribe({
        next: () => {
          this.message.set('Rol asignado correctamente.');
          this.closeDialog();
          this.loadData();
        },
        error: (err) => {
          this.error.set(err.error?.message || 'No fue posible asignar el rol.');
        },
      });
  }

  reactivate(row: RoleUser): void {
    if (this.reactivating() || this.loading() || row.status !== 'inactive') return;

    this.reactivating.set(true);
    this.error.set('');
    this.message.set('');

    this.assignmentApi.reactivate(row.id).subscribe({
      next: () => {
        this.message.set('Asignación reactivada correctamente.');
        this.loadData();
        this.reactivating.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible reactivar la asignación.');
        this.reactivating.set(false);
      },
    });
  }

  deactivate(row: RoleUser): void {
    const role = this.roleFor(row);

    if (
      role?.name === 'ADMIN' &&
      this.rows().filter((item) => item.role_id === role.id && item.status === 'active')
          .length <= 1
    ) {
      this.error.set(
        'No puedes retirar el último rol ADMIN. Asigna y verifica primero otro administrador.',
      );
      return;
    }

    const user = this.userFor(row);

    if (
      !window.confirm(
        `¿Deseas retirar el rol ${role?.name ?? ''} al usuario ${user?.username ?? ''}?`,
      )
    )
      return;

    this.assignmentApi.deactivate(row.id).subscribe({
      next: () => {
        this.message.set('Rol retirado correctamente.');
        this.error.set('');
        this.loadData();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible retirar el rol.');
      },
    });
  }
}
