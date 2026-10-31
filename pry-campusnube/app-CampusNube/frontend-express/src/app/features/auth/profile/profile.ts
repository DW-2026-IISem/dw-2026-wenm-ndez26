import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { SessionStore } from '../../../core/auth/session.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  readonly store = inject(SessionStore);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  refreshProfile(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.auth.me().subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('No fue posible actualizar el perfil.');
      }
    });
  }

  logout(): void {
    this.auth.logout().subscribe({
      complete: () => {
        void this.router.navigate(['/login']);
      }
    });
  }
}
