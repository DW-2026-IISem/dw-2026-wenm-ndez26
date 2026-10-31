import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';

import { watchMediaQuery } from '../../core/utils/media-query';
import { AuthService } from '../../core/auth/auth.service';
import { SessionStore } from '../../core/auth/session.store';

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

  readonly items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard',
    },
    {
      label: 'Mi perfil',
      icon: 'pi pi-user',
      routerLink: '/perfil',
    },
    {
      label: 'Docentes',
      icon: 'pi pi-users',
      routerLink: '/docentes',
    },
    {
      label: 'Aprendices',
      icon: 'pi pi-user',
      routerLink: '/aprendices',
    },
    {
      label: 'Cursos',
      icon: 'pi pi-book',
      routerLink: '/cursos',
    },
    {
      label: 'Módulos',
      icon: 'pi pi-list',
      routerLink: '/modulos',
    },
    {
      label: 'Lecciones',
      icon: 'pi pi-file',
      routerLink: '/lecciones',
    },
    {
      label: 'Evaluaciones',
      icon: 'pi pi-clipboard',
      routerLink: '/evaluaciones',
    },
    {
      label: 'Inscripciones',
      icon: 'pi pi-user-plus',
      routerLink: '/inscripciones',
    },
    {
      label: 'Intentos',
      icon: 'pi pi-check-square',
      routerLink: '/intentos',
    },
    {
      label: 'Entregas',
      icon: 'pi pi-upload',
      routerLink: '/entregas',
    },
    {
      label: 'Progreso',
      icon: 'pi pi-chart-line',
      routerLink: '/progreso',
    },
    {
      label: 'Certificados',
      icon: 'pi pi-id-card',
      routerLink: '/certificados',
    },
    {
      label: 'Prototipo',
      icon: 'pi pi-desktop',
      routerLink: '/construir',
    },
  ];

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
