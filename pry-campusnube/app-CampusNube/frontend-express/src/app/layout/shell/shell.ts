import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';

import { watchMediaQuery } from '../../core/utils/media-query';
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

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);

  readonly items: MenuItem[] = [
    { label: 'Docentes', icon: 'pi pi-users', routerLink: '/docentes' },
    { label: 'Aprendices', icon: 'pi pi-user', routerLink: '/aprendices' },
    { label: 'Cursos', icon: 'pi pi-book', routerLink: '/cursos' },
    { label: 'Módulos', icon: 'pi pi-list', routerLink: '/modulos' },
    { label: 'Lecciones', icon: 'pi pi-file', routerLink: '/lecciones' },
    { label: 'Evaluaciones', icon: 'pi pi-clipboard', routerLink: '/evaluaciones' },
    { label: 'Inscripciones', icon: 'pi pi-user-plus', routerLink: '/inscripciones' },
    { label: 'Intentos', icon: 'pi pi-check-square', routerLink: '/intentos' },
    {

      label: 'Entregas',

      icon: 'pi pi-upload',

      routerLink: ['/entregas']

    },

    { label: 'Prototipo', icon: 'pi pi-desktop', routerLink: '/construir' },
  ];

  protected onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
      return;
    }

    this.mobileOpen.set(true);
  }
}
