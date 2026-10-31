import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';

import { watchMediaQuery } from '../../core/utils/media-query';
import { AuthService } from '../../core/auth/auth.service';
import { SessionStore } from '../../core/auth/session.store';

import { NAV } from './nav.config';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

@Component({
  selector: 'app-shell',
  standalone: true,
  host: { class: 'block' },
  imports: [
    RouterOutlet,
    Header,
    Aside,
    Footer,
    ConfirmDialogModule,
    DrawerModule,
    ToastModule,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  private readonly isDesktop = watchMediaQuery('(min-width: 1024px)');
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly session = inject(SessionStore);

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);

  readonly items = computed<MenuItem[]>(() =>
    NAV
      .filter(item => !item.authOnly || this.session.authEnabled)
      .filter(item =>
        !item.permission ||
        this.session.canPermission(item.permission)
      )
      .map(item => ({
        label: item.label,
        icon: item.icon,
        routerLink: item.routerLink,
        routerLinkActiveOptions: {
          exact: item.routerLink === '/dashboard'
        }
      }))
  );

  protected onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update(collapsed => !collapsed);
      return;
    }

    this.mobileOpen.set(true);
  }

  protected onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.mobileOpen.set(false);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Error al cerrar sesión:', error);
        this.session.clear();
        this.router.navigate(['/login']);
      },
    });
  }
}
