import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  readonly form = this.fb.nonNullable.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);

        const requestedUrl =
          this.route.snapshot.queryParamMap.get('returnUrl');

        const returnUrl =
          requestedUrl?.startsWith('/') &&
          !requestedUrl.startsWith('/login')
            ? requestedUrl
            : '/dashboard';

        void this.router.navigateByUrl(returnUrl);
      },
      error: error => {
        this.loading.set(false);

        this.errorMessage.set(
          error.status === 401
            ? 'Usuario o contraseña incorrectos.'
            : 'No fue posible iniciar sesión. Verifica la conexión.'
        );
      }
    });
  }
}
