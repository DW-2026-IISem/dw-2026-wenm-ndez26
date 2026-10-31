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
      grants: this.resourceRoleApi.list(),
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

  openDialog(): void {
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
}
