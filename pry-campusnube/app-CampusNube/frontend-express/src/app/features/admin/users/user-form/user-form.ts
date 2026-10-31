import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { User, UserPayload } from '../../../../core/models/user.model';
import { Status } from '../../../../core/models/api.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private readonly fb = inject(FormBuilder);

  @Input() user: User | null = null;
  @Output() saved = new EventEmitter<UserPayload>();
  @Output() cancelled = new EventEmitter<void>();

  readonly form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    avatar: [''],
    status: ['active' as Status, [Validators.required]],
  });

  ngOnChanges(): void {
    const password = this.form.controls.password;

    if (this.user) {
      password.clearValidators();
      password.disable();

      this.form.controls.status.disable();

      this.form.patchValue({
        username: this.user.username,
        email: this.user.email,
        avatar: this.user.avatar ?? '',
        status: this.user.status,
      });
    } else {
      password.setValidators([Validators.required, Validators.minLength(8)]);

      password.enable();
      this.form.controls.status.enable();

      this.form.reset({
        username: '',
        email: '',
        password: '',
        avatar: '',
        status: 'active',
      });
    }

    password.updateValueAndValidity();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: UserPayload = {
      username: value.username!.trim(),
      email: value.email!.trim(),
      avatar: value.avatar?.trim() || null,
    };

    if (!this.user) {
      payload.status = value.status!;
      payload.password = value.password!;
    }

    this.saved.emit(payload);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
