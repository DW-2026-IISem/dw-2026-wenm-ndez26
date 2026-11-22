import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Shell } from './shell';
import { vi } from 'vitest';

describe('Shell', () => {
  let fixture: ComponentFixture<Shell>;
  let compilado: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shell],
      providers: [provideRouter([]), MessageService, ConfirmationService],
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
    const shell = fixture.componentInstance;

    vi.spyOn(shell.session, 'canPermission').mockReturnValue(true);
    shell.session.clear();

    expect(shell.items().map((item) => item.label)).toEqual([
      'Panel',
      'Docentes',
      'Aprendices',
      'Cursos',
      'Módulos',
      'Lecciones',
      'Evaluaciones',
      'Inscripciones',
      'Intentos',
      'Entregas',
      'Progreso',
      'Certificados',
      'Usuarios',
      'Roles',
      'Recursos',
      'Asignaciones',
      'Permisos',
      'Prototipo',
    ]);
  });

  it('debe compartir la lista de navegación con los menús', () => {
    const shell = fixture.componentInstance;

    vi.spyOn(shell.session, 'canPermission').mockReturnValue(true);
    shell.session.clear();

    expect(shell.items().length).toBe(18);
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
