import { Component, effect, inject, input, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { Learner, LearnerPayload } from '../../../core/models/learner.model';

@Component({
  selector: 'app-learner-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    SelectModule,
    TextareaModule,
  ],
  templateUrl: './learner-form.html',
  styleUrl: './learner-form.css',
})
export class LearnerForm {
  readonly learner = input<Learner | null>(null);
  readonly resetKey = input(0);
  readonly saving = input(false);
  readonly saved = output<LearnerPayload>();
  readonly cancelled = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly statusOptions = [
    { label: 'Activo', value: 'active' },
    { label: 'Inactivo', value: 'inactive' },
  ];

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    description: [''],
    password: [''],
    status: ['active' as 'active' | 'inactive', Validators.required],
  });

  constructor() {
    effect(() => {
      const current = this.learner();
      this.resetKey();

      this.form.reset({
        name: current?.name ?? '',
        description: current?.description ?? '',
        password: '',
        status: current?.status ?? 'active',
      });

      if (current) {
        this.form.controls.password.clearValidators();
        this.form.controls.status.disable();
      } else {
        this.form.controls.password.setValidators([Validators.required]);
        this.form.controls.status.enable();
      }

      this.form.controls.password.updateValueAndValidity();
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: LearnerPayload = {
      name: value.name.trim(),
      description: value.description.trim() || null,
      ...(value.password.trim()
        ? { password: value.password.trim() }
        : {}),
      ...(this.learner() ? {} : { status: value.status }),
    };

    this.saved.emit(payload);
  }
}
