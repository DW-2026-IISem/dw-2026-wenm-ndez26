import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Shell } from './shell';

describe('Shell', () => {
  let fixture: ComponentFixture<Shell>;
  let compilado: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shell],
      providers: [
        provideRouter([]),
        MessageService,
        ConfirmationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Shell);
    fixture.detectChanges();

    compilado = fixture.nativeElement as HTMLElement;
  });

  it('debe crear el componente Shell', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debe mostrar encabezado, menú lateral, contenido y pie de página', () => {
    expect(compilado.querySelector('app-header')).toBeTruthy();
    expect(compilado.querySelector('app-aside')).toBeTruthy();
    expect(compilado.querySelector('main#contenido')).toBeTruthy();
    expect(compilado.querySelector('router-outlet')).toBeTruthy();
    expect(compilado.querySelector('app-footer')).toBeTruthy();
  });

  it('debe tener los elementos de navegación de CampusNube', () => {
    expect(fixture.componentInstance.items).toEqual([
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
        label: 'Prototipo',
        icon: 'pi pi-desktop',
        routerLink: '/construir',
      },
    ]);
  });

  it('debe compartir la lista de navegación con los menús', () => {
    const shell = fixture.componentInstance;

    expect(shell.items.length).toBe(7);
    expect(shell.items[0].label).toBe('Docentes');
    expect(shell.items[1].label).toBe('Aprendices');
    expect(shell.items[2].label).toBe('Cursos');
    expect(shell.items[3].label).toBe('Módulos');
    expect(shell.items[4].label).toBe('Lecciones');
    expect(shell.items[5].label).toBe('Evaluaciones');
    expect(shell.items[6].label).toBe('Prototipo');

    expect(compilado.querySelector('app-aside')).toBeTruthy();
    expect(compilado.querySelector('p-drawer')).toBeTruthy();
  });

  it('debe iniciar con el menú móvil cerrado', () => {
    expect(fixture.componentInstance.mobileOpen()).toBe(false);
  });

  it('debe iniciar con la barra lateral expandida', () => {
    expect(fixture.componentInstance.sidebarCollapsed()).toBe(false);
  });
});
