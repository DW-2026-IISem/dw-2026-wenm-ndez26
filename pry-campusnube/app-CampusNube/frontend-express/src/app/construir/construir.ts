
import { Component, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DrawerModule } from 'primeng/drawer';
import { watchMediaQuery } from '../core/utils/media-query';
import { Aside } from '../layout/aside/aside';
import { Footer } from '../layout/footer/footer';
import { Header } from '../layout/header/header';

@Component({
  host: { class: 'block' },
  selector: 'app-construir',
  imports: [Aside, CardModule, DrawerModule, Footer, Header],
  templateUrl: './construir.html',
  styleUrl: './construir.css',
})
export class Construir {
  private readonly isDesktop = watchMediaQuery('(min-width: 1024px)');

  readonly sidebarCollapsed = signal(false);
  readonly mobileOpen = signal(false);
  readonly title = signal('Inicio');

  readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => this.seleccionar('Inicio'),
    },
    {
      label: 'Mis cursos',
      icon: 'pi pi-book',
      command: () => this.seleccionar('Mis cursos'),
    },
    {
      label: 'Módulos',
      icon: 'pi pi-th-large',
      command: () => this.seleccionar('Módulos'),
    },
    {
      label: 'Evaluaciones',
      icon: 'pi pi-file-edit',
      command: () => this.seleccionar('Evaluaciones'),
    },
    {
      label: 'Mi progreso',
      icon: 'pi pi-chart-line',
      command: () => this.seleccionar('Mi progreso'),
    },
  ];

  protected onMenuToggle(): void {
    if (this.isDesktop()) {
      this.sidebarCollapsed.update((collapsed) => !collapsed);
      return;
    }

    this.mobileOpen.set(true);
  }

  protected seleccionar(titulo: string): void {
    this.title.set(titulo);
    this.mobileOpen.set(false);
  }
}
