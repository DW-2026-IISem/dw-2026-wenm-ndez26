
import { TestBed } from '@angular/core/testing';
import { Construir } from './construir';

function stubDesktopMedia(matches: boolean): () => void {
  const original = window.matchMedia;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) =>
      ({
        matches,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }) as unknown as MediaQueryList,
  });

  return () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: original,
    });
  };
}

describe('Construir', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Construir],
    }).compileComponents();
  });

  async function crearPantalla() {
    const fixture = TestBed.createComponent(Construir);
    await fixture.whenStable();

    return {
      fixture,
      compilado: fixture.nativeElement as HTMLElement,
    };
  }

  function botonMenu(compilado: HTMLElement): HTMLButtonElement {
    const boton = compilado.querySelector(
      'app-header button[aria-label="Mostrar u ocultar el menú"]',
    );

    expect(boton).toBeTruthy();
    return boton as HTMLButtonElement;
  }

  function opcionDelMenu(
    compilado: HTMLElement,
    etiqueta: string,
  ): HTMLElement {
    const opciones = [
      ...compilado.querySelectorAll('a, button, [role="menuitem"]'),
    ];

    const opcion = opciones.find((elemento) => {
      const texto = elemento.textContent?.replace(/\s+/g, ' ').trim();
      return texto === etiqueta;
    });

    expect(opcion).toBeTruthy();
    return opcion as HTMLElement;
  }

  it('debe componer el layout y comenzar en Inicio', async () => {
    const { compilado } = await crearPantalla();

    expect(compilado.querySelector('app-header')).toBeTruthy();
    expect(compilado.querySelector('aside app-aside')).toBeTruthy();
    expect(compilado.querySelector('app-footer')).toBeTruthy();
    expect(compilado.querySelector('main h1')?.textContent).toContain('Inicio');
  });

  it('debe mostrar las cinco opciones del menú', async () => {
    const { compilado } = await crearPantalla();
    const texto = compilado.textContent ?? '';

    for (const etiqueta of [
      'Inicio',
      'Mis cursos',
      'Módulos',
      'Evaluaciones',
      'Mi progreso',
    ]) {
      expect(texto).toContain(etiqueta);
    }
  });

  it('debe mostrar siempre el botón de menú', async () => {
    const { compilado } = await crearPantalla();
    const boton = botonMenu(compilado);

    expect(boton.getAttribute('aria-label')).toBe(
      'Mostrar u ocultar el menú',
    );
    expect(boton.classList.contains('lg:hidden')).toBe(false);
  });

  it('debe cambiar el título al seleccionar una opción', async () => {
    const { fixture, compilado } = await crearPantalla();

    opcionDelMenu(compilado, 'Mis cursos').click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compilado.querySelector('main h1')?.textContent).toContain(
      'Mis cursos',
    );
  });

  it('debe abrir el Drawer en móvil', async () => {
    const { fixture, compilado } = await crearPantalla();
    const componente = fixture.componentInstance;

    expect(componente.mobileOpen()).toBe(false);

    botonMenu(compilado).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(componente.mobileOpen()).toBe(true);
  });

  it('debe alternar el Aside fijo en escritorio', async () => {
    const restaurar = stubDesktopMedia(true);

    try {
      const { fixture, compilado } = await crearPantalla();

      expect(compilado.querySelector('aside app-aside')).toBeTruthy();

      botonMenu(compilado).click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.sidebarCollapsed()).toBe(true);
      expect(compilado.querySelector('aside app-aside')).toBeNull();
      expect(fixture.componentInstance.mobileOpen()).toBe(false);
    } finally {
      restaurar();
    }
  });

  it('debe cerrar el Drawer al seleccionar una opción', async () => {
    const { fixture, compilado } = await crearPantalla();
    const componente = fixture.componentInstance;

    botonMenu(compilado).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(componente.mobileOpen()).toBe(true);

    opcionDelMenu(compilado, 'Mi progreso').click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(componente.mobileOpen()).toBe(false);
    expect(compilado.querySelector('main h1')?.textContent).toContain(
      'Mi progreso',
    );
  });
});
