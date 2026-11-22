import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';

import { SessionStore } from '../../core/auth/session.store';
import { RolesPermissionsPage } from './roles-permissions-page';

@Component({ standalone: true, template: '<p>Sección de asignaciones</p>' })
class AssignmentsStub {}

@Component({ standalone: true, template: '<p>Sección de concesiones</p>' })
class GrantsStub {}

describe('RolesPermissionsPage', () => {
  it('abre las dos secciones desde la misma pantalla', async () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SessionStore, useValue: { authEnabled: false } },
        provideRouter([
          {
            path: 'admin/roles-permisos',
            component: RolesPermissionsPage,
            children: [
              { path: 'asignaciones', component: AssignmentsStub },
              { path: 'concesiones', component: GrantsStub },
            ],
          },
        ]),
      ],
    });

    const harness = await RouterTestingHarness.create('/admin/roles-permisos');
    const router = TestBed.inject(Router);
    const page = harness.routeNativeElement!;

    expect(page.querySelector('h1')?.textContent).toContain('Roles y permisos');

    for (const section of [
      { path: 'asignaciones', content: 'Sección de asignaciones' },
      { path: 'concesiones', content: 'Sección de concesiones' },
    ]) {
      const url = `/admin/roles-permisos/${section.path}`;
      const link = page.querySelector<HTMLAnchorElement>(`a[href="${url}"]`)!;
      const navigation = new Promise<boolean>((resolve) => {
        const subscription = router.events.subscribe((event) => {
          if (event instanceof NavigationEnd && event.urlAfterRedirects === url) {
            subscription.unsubscribe();
            resolve(true);
          }
        });
      });

      link.click();
      await navigation;
      harness.detectChanges();

      expect(router.url).toBe(url);
      expect(page.textContent).toContain(section.content);
    }
  });
});
