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
  styleUrl: './profile.css',
})
export class Profile {
  readonly store = inject(SessionStore);

  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly avatarPreview = signal<string | null>(null);
  readonly photoBusy = signal(false);
  readonly photoMessage = signal('');

  async selectPhoto(input: HTMLInputElement): Promise<void> {
    const file = input.files?.[0];
    input.value = '';
    if (!file || this.photoBusy()) return;

    this.errorMessage.set('');
    this.photoMessage.set('');
    this.avatarPreview.set(null);

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      this.errorMessage.set('Elige una imagen JPG, PNG o WebP de hasta 5 MB.');
      return;
    }

    this.photoBusy.set(true);
    try {
      const image = await createImageBitmap(file);
      try {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 224;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('No se pudo preparar la foto.');

        const side = Math.min(image.width, image.height);
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, 224, 224);
        context.drawImage(
          image, (image.width - side) / 2, (image.height - side) / 2,
          side, side, 0, 0, 224, 224,
        );
        this.avatarPreview.set(canvas.toDataURL('image/jpeg', 0.78));
      } finally {
        image.close();
      }
    } catch {
      this.errorMessage.set('No se pudo abrir la imagen seleccionada.');
    } finally {
      this.photoBusy.set(false);
    }
  }

  savePhoto(avatar: string | null): void {
    if (this.photoBusy()) return;
    this.photoBusy.set(true);
    this.errorMessage.set('');
    this.photoMessage.set('');

    this.auth.updateAvatar(avatar).subscribe({
      next: () => {
        this.avatarPreview.set(null);
        this.photoMessage.set(avatar ? 'Foto guardada.' : 'Foto eliminada.');
        this.photoBusy.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message || 'No se pudo actualizar la foto.');
        this.photoBusy.set(false);
      },
    });
  }

  refreshProfile(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.auth.me().subscribe({
      next: () => this.loading.set(false),
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('No fue posible actualizar el perfil.');
      },
    });
  }

  logout(): void {
    this.auth.logout().subscribe({
      complete: () => {
        void this.router.navigate(['/login']);
      },
    });
  }
}
