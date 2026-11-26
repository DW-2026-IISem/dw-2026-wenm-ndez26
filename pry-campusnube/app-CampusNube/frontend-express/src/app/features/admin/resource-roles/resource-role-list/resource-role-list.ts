import { SessionStore } from '../../../../core/auth/session.store';
import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

import { RoleApi } from '../../roles/role-api';
import { ResourceApi } from '../../resources/resource-api';
import { ResourceRoleApi } from '../resource-role-api';

import { Role } from '../../../../core/models/role.model';
import { Resource, HttpMethod } from '../../../../core/models/resource.model';
import { ResourceRole } from '../../../../core/models/resource-role.model';

@Component({
  selector: 'app-resource-role-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule, DialogModule, TagModule],
  templateUrl: './resource-role-list.html',
  styleUrl: './resource-role-list.css',
})
export class ResourceRoleList {
  private readonly roleApi = inject(RoleApi);
  private readonly resourceApi = inject(ResourceApi);
  private readonly resourceRoleApi = inject(ResourceRoleApi);

  readonly roles = signal<Role[]>([]);
  readonly resources = signal<Resource[]>([]);
  readonly rows = signal<ResourceRole[]>([]);

  readonly loading = signal(false);
  readonly error = signal('');
  readonly message = signal('');

  readonly filterRole = signal<number | null>(null);
  readonly search = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedRole = signal<Role | null>(null);
  readonly selectedResource = signal<Resource | null>(null);
  readonly saving = signal(false);
  readonly updatingStatus = signal(false);

  readonly visibleRows = computed(() => {
    const roleId = this.filterRole();
    const term = this.search().trim().toLowerCase();

    return this.rows().filter((row) => {
      const roleMatches = roleId === null || row.role_id === roleId;

      const resource = this.resources().find((item) => item.id === row.resource_id);

      const searchMatches =
        !term ||
        resource?.path.toLowerCase().includes(term) ||
        resource?.method.toLowerCase().includes(term);

      return roleMatches && searchMatches;
    });
  });

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      roles: this.roleApi.list(),
      resources: this.resourceApi.list(),
      grants: this.resourceRoleApi.list({ includeInactive: true }),
    }).subscribe({
      next: (result) => {
        this.roles.set(result.roles);
        this.resources.set(result.resources);
        this.rows.set(result.grants);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible cargar las concesiones.');
        this.loading.set(false);
      },
    });
  }

  readonly grantQuery = signal('');

  readonly grantOptions = computed(() => {
    const query = this.grantQuery().trim().toLowerCase();
    return this.resources().filter((resource) =>
      (resource.method + ' ' + resource.path).toLowerCase().includes(query),
    );
  });

  selectGrantRole(value: string): void {
    this.selectedRole.set(this.roles().find((role) => String(role.id) === value) ?? null);
  }

  selectGrantResource(value: string): void {
    this.selectedResource.set(
      this.resources().find((resource) => String(resource.id) === value) ?? null,
    );
  }

  openDialog(): void {
    this.grantQuery.set('');
    this.selectedRole.set(null);
    this.selectedResource.set(null);
    this.error.set('');
    this.message.set('');
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedRole.set(null);
    this.selectedResource.set(null);
  }

  createGrant(): void {
    const role = this.selectedRole();
    const resource = this.selectedResource();

    if (!role || !resource) {
      this.error.set('Selecciona un rol y un recurso.');
      return;
    }

    this.saving.set(true);
    this.error.set('');

    this.resourceRoleApi
      .create({
        role_id: role.id,
        resource_id: resource.id,
      })
      .subscribe({
        next: () => {
          this.saving.set(false);
          this.closeDialog();
          this.message.set('Permiso concedido correctamente.');
          this.loadData();
        },
        error: (err) => {
          this.saving.set(false);
          this.error.set(err.error?.message || 'No fue posible conceder el permiso.');
        },
      });
  }

  togglePermission(row: ResourceRole, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    checkbox.checked = row.status === 'active';
    this.changeStatus(row);
  }

  private changeStatus(row: ResourceRole): void {
    if (this.updatingStatus() || this.saving() || this.loading()) return;

    const active = row.status === 'active';
    const action = active ? 'retirar' : 'reactivar';
    if (!window.confirm(`¿Deseas ${action} este permiso?`)) return;

    this.updatingStatus.set(true);
    this.error.set('');
    this.message.set('');

    const request = active
      ? this.resourceRoleApi.deactivate(row.id)
      : this.resourceRoleApi.reactivate(row.id);

    request.subscribe({
      next: () => {
        this.message.set(active ? 'Permiso retirado.' : 'Permiso reactivado.');
        this.loadData();
        this.updatingStatus.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || `No fue posible ${action} el permiso.`);
        this.updatingStatus.set(false);
      },
    });
  }

  roleName(id: number): string {
    return this.roles().find((role) => role.id === id)?.name ?? 'Rol no encontrado';
  }

  resourceFor(id: number): Resource | undefined {
    return this.resources().find((resource) => resource.id === id);
  }

  methodSeverity(method: HttpMethod | string | undefined) {
    switch (method) {
      case 'GET':
        return 'info';
      case 'POST':
        return 'success';
      case 'PUT':
      case 'PATCH':
        return 'warn';
      case 'DELETE':
        return 'danger';
      default:
        return 'secondary';
    }
  }

  private readonly batchSession = inject(SessionStore);
  readonly batchVisible = signal(false);
  readonly batchBusy = signal(false);
  readonly batchError = signal('');
  readonly batchTarget = signal<Role | null>(null);
  readonly batchQuery = signal('');
  readonly batchOptions = signal<number[]>([]);
  readonly batchRows = signal<number[]>([]);
  readonly canAddBatch = computed(() =>
    this.batchSession.canExact('POST', '/api/concesiones-rol/lote'),
  );
  readonly canWithdrawBatch = computed(() =>
    this.batchSession.canExact('PATCH', '/api/concesiones-rol/lote/deactivate'),
  );
  readonly availableTargets = computed(() =>
    this.roles().filter((item) => item.status === 'active'),
  );
  readonly visibleBatchOptions = computed(() => {
    const query = this.batchQuery().trim().toLowerCase();
    return this.resources()
      .filter((item) => item.status === 'active')
      .map((item) => ({ id: item.id, method: item.method, path: item.path, description: item.description, label: item.method + ' ' + item.path + ' ' + (item.description ?? '') }))
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
    this.resourceRoleApi.createBatch(target.id, ids).subscribe({
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
    this.resourceRoleApi.deactivateBatch(ids).subscribe({
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
