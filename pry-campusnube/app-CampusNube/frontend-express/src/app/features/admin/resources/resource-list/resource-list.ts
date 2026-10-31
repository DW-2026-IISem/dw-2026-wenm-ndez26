import { Component, inject, signal } from '@angular/core';

import { ResourceApi } from '../resource-api';
import { ResourceForm } from '../resource-form/resource-form';

import {
  Resource,
  ResourcePayload,
  ResourceUpdatePayload,
} from '../../../../core/models/resource.model';

import { SessionStore } from '../../../../core/auth/session.store';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [ResourceForm],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.css',
})
export class ResourceList {
  private readonly api = inject(ResourceApi);
  private readonly session = inject(SessionStore);

  readonly resources = signal<Resource[]>([]);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly message = signal('');
  readonly showForm = signal(false);
  readonly editingResource = signal<Resource | null>(null);

  canList(): boolean {
    return this.session.can('GET', '/api/recursos');
  }

  canCreate(): boolean {
    return this.session.can('POST', '/api/recursos');
  }

  canEdit(resource: Resource): boolean {
    return this.session.can('PATCH', `/api/recursos/${resource.id}`);
  }

  canDeactivate(resource: Resource): boolean {
    return this.session.can('PATCH', `/api/recursos/${resource.id}/deactivate`);
  }

  canDelete(resource: Resource): boolean {
    return this.session.can('DELETE', `/api/recursos/${resource.id}`);
  }

  constructor() {
    this.loadResources();
  }

  loadResources(): void {
    if (!this.canList()) {
      this.error.set('No tienes permiso para consultar los recursos.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.api.list().subscribe({
      next: (resources) => {
        this.resources.set(resources);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Error al cargar los recursos.');
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    if (!this.canCreate()) return;

    this.editingResource.set(null);
    this.showForm.set(true);
    this.error.set('');
    this.message.set('');
  }

  openEdit(resource: Resource): void {
    if (!this.canEdit(resource)) return;

    this.editingResource.set(resource);
    this.showForm.set(true);
    this.error.set('');
    this.message.set('');
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingResource.set(null);
  }

  save(payload: ResourcePayload | ResourceUpdatePayload): void {
    const current = this.editingResource();

    const request = current
      ? this.api.update(current.id, payload as Partial<ResourcePayload>)
      : this.api.create(payload as ResourcePayload);

    request.subscribe({
      next: () => {
        this.closeForm();
        this.message.set('Recurso guardado correctamente.');
        this.loadResources();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible guardar el recurso.');
      },
    });
  }

  deactivate(resource: Resource): void {
    if (!this.canDeactivate(resource)) return;

    if (!window.confirm(`¿Deseas desactivar ${resource.method} ${resource.path}?`)) return;

    this.api.deactivate(resource.id).subscribe({
      next: () => {
        this.message.set('Recurso desactivado correctamente.');
        this.loadResources();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible desactivar el recurso.');
      },
    });
  }

  remove(resource: Resource): void {
    if (!this.canDelete(resource)) return;

    if (
      !window.confirm(
        `¿Eliminar definitivamente ${resource.method} ${resource.path}? Esta acción puede afectar resource_roles.`,
      )
    )
      return;

    this.api.remove(resource.id).subscribe({
      next: () => {
        this.message.set('Recurso eliminado correctamente.');
        this.loadResources();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'No fue posible eliminar el recurso.');
      },
    });
  }
}
