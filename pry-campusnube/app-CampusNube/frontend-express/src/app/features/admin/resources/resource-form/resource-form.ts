import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  Resource,
  ResourcePayload,
  ResourceUpdatePayload,
  HTTP_METHODS,
  HttpMethod,
} from '../../../../core/models/resource.model';

import { Status } from '../../../../core/models/api.model';

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.css',
})
export class ResourceForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() resource: Resource | null = null;
  @Input() resources: Resource[] = [];

  @Output() saved = new EventEmitter<ResourcePayload | ResourceUpdatePayload>();
  @Output() cancelled = new EventEmitter<void>();

  readonly methods = HTTP_METHODS;
  duplicateError = '';

  readonly form = this.fb.group({
    method: ['GET' as HttpMethod, [Validators.required]],
    path: ['', [Validators.required, Validators.pattern(/^\/.*/)]],
    description: [''],
    status: ['active' as Status, [Validators.required]],
  });

  ngOnChanges(): void {
    this.duplicateError = '';

    if (this.resource) {
      this.form.controls.status.disable();

      this.form.patchValue({
        method: this.resource.method as HttpMethod,
        path: this.resource.path,
        description: this.resource.description ?? '',
        status: this.resource.status,
      });
    } else {
      this.form.controls.status.enable();

      this.form.reset({
        method: 'GET',
        path: '',
        description: '',
        status: 'active',
      });
    }
  }

  submit(): void {
    this.duplicateError = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const method = value.method!;
    const path = value.path!.trim();
    const description = value.description?.trim() || null;

    const duplicate = this.resources.some(
      (item) =>
        item.method === method &&
        item.path.toLowerCase() === path.toLowerCase() &&
        item.id !== this.resource?.id,
    );

    if (duplicate) {
      this.duplicateError = 'Ya existe un recurso registrado con ese método y esa ruta.';
      return;
    }

    if (this.resource) {
      const payload: ResourceUpdatePayload = {
        method,
        path,
        description,
      };

      this.saved.emit(payload);
      return;
    }

    const payload: ResourcePayload = {
      method,
      path,
      description,
      status: value.status!,
    };

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
