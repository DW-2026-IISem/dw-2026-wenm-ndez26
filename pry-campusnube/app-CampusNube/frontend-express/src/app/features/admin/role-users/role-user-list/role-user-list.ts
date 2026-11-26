import { SessionStore } from '../../../../core/auth/session.store';
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

  private readonly batchSession = inject(SessionStore);
  readonly batchVisible = signal(false);
  readonly batchBusy = signal(false);
  readonly batchError = signal('');
  readonly batchTarget = signal<User | null>(null);
  readonly batchQuery = signal('');
  readonly batchOptions = signal<number[]>([]);
  readonly batchRows = signal<number[]>([]);
  readonly canAddBatch = computed(() =>
    this.batchSession.canExact('POST', '/api/asignaciones-rol/lote'),
  );
  readonly canWithdrawBatch = computed(() =>
    this.batchSession.canExact('PATCH', '/api/asignaciones-rol/lote/deactivate'),
  );
  readonly availableTargets = computed(() =>
    this.users().filter((item) => item.status === 'active'),
  );
  readonly visibleBatchOptions = computed(() => {
    const query = this.batchQuery().trim().toLowerCase();
    return this.roles()
      .filter((item) => item.status === 'active')
      .map((item) => ({ id: item.id, label: item.name }))
      .filter((item) => item.label.toLowerCase().includes(query));
  });
  readonly visibleActiveIds = computed(() =>
    this.visibleRows().filter((row) => row.status === 'active').map((row) => row.id),
  );
  readonly selectedVisibleIds = computed(() => {
    const selected = new Set(this.batchRows());
    return this.visibleActiveIds().filter((id) => selected.has(id));
  });

  openBatch(): void {
    if (!this.canAddBatch() || this.batchBusy()) return;
    this.batchTarget.set(null);
    this.batchOptions.set([]);
    this.batchQuery.set('');
    this.batchError.set('');
    this.batchVisible.set(true);
  }

  chooseBatchTarget(value: string): void {
    this.batchTarget.set(this.availableTargets().find((item) => String(item.id) === value) ?? null);
  }

  readonly allBatchOptionsSelected = computed(() => {
    const visible = this.visibleBatchOptions();
    const selected = new Set(this.batchOptions());
    return visible.length > 0 && visible.every((option) => selected.has(option.id));
  });

  toggleVisibleBatchOptions(checked: boolean): void {
    if (this.batchBusy()) return;
    const visible = new Set(this.visibleBatchOptions().map((option) => option.id));
    this.batchOptions.update((selected) => checked
      ? [...new Set([...selected, ...visible])].slice(0, 200)
      : selected.filter((id) => !visible.has(id)));
  }

  toggleBatchOption(id: number, checked: boolean): void {
    this.batchOptions.update((items) => checked
      ? [...new Set([...items, id])]
      : items.filter((item) => item !== id));
  }

  toggleBatchRow(id: number, checked: boolean): void {
    this.batchRows.update((items) => checked
      ? [...new Set([...items, id])]
      : items.filter((item) => item !== id));
  }

  toggleVisibleBatchRows(checked: boolean): void {
    const visible = this.visibleActiveIds();
    this.batchRows.update((items) => checked
      ? [...new Set([...items, ...visible])]
      : items.filter((id) => !visible.includes(id)));
  }

  saveBatch(): void {
    const target = this.batchTarget();
    const ids = this.batchOptions();
    if (!target || !ids.length || ids.length > 200 || this.batchBusy() || !this.canAddBatch()) return;

    this.batchBusy.set(true);
    this.batchError.set('');
    this.assignmentApi.createBatch(target.id, ids).subscribe({
      next: (result) => {
        this.batchBusy.set(false);
        this.batchVisible.set(false);
        this.message.set('Registros procesados: ' + result.processed + '.');
        this.loadData();
      },
      error: (err) => {
        this.batchError.set(err.error?.error || err.error?.message || 'No se pudo guardar el lote.');
        this.batchBusy.set(false);
      },
    });
  }

  withdrawBatch(): void {
    const ids = this.selectedVisibleIds();
    if (!ids.length || ids.length > 200 || this.batchBusy() || !this.canWithdrawBatch()) return;
    if (!window.confirm('¿Retirar los ' + ids.length + ' registros seleccionados?')) return;

    this.batchBusy.set(true);
    this.error.set('');
    this.assignmentApi.deactivateBatch(ids).subscribe({
      next: (result) => {
        this.batchBusy.set(false);
        this.batchRows.set([]);
        this.message.set('Registros retirados: ' + result.processed + '.');
        this.loadData();
      },
      error: (err) => {
        this.error.set(err.error?.error || err.error?.message || 'No se pudo retirar el lote.');
        this.batchBusy.set(false);
      },
    });
  }
}
