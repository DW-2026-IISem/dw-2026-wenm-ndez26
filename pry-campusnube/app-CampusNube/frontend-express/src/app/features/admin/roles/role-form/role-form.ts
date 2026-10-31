import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Role, RolePayload, RoleUpdatePayload } from '../../../../core/models/role.model';

import { Status } from '../../../../core/models/api.model';

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './role-form.html',
  styleUrl: './role-form.css',
})
export class RoleForm implements OnChanges {
  private readonly fb = inject(FormBuilder);

  @Input() role: Role | null = null;

  @Output() saved = new EventEmitter<RolePayload | RoleUpdatePayload>();
  @Output() cancelled = new EventEmitter<void>();

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    description: [''],
    status: ['active' as Status, [Validators.required]],
  });

  ngOnChanges(): void {
    if (this.role) {
      this.form.controls.status.disable();

      this.form.patchValue({
        name: this.role.name,
        description: this.role.description ?? '',
        status: this.role.status,
      });
    } else {
      this.form.controls.status.enable();

      this.form.reset({
        name: '',
        description: '',
        status: 'active',
      });
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const name = value.name!.trim().toUpperCase();

    if (!name) {
      this.form.controls.name.setErrors({ required: true });
      return;
    }

    const description = value.description?.trim() || null;

    if (this.role) {
      const payload: RoleUpdatePayload = {
        name,
        description,
      };

      this.saved.emit(payload);
      return;
    }

    const payload: RolePayload = {
      name,
      description,
      status: value.status!,
    };

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
