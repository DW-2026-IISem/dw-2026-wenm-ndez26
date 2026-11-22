import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { SessionStore } from '../../core/auth/session.store';
import { CRUD_RESOURCES } from './crud-resources';

@Component({
  selector: 'app-roles-permissions-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './roles-permissions-page.html',
  styleUrl: './roles-permissions-page.css',
})
export class RolesPermissionsPage {
  private readonly session = inject(SessionStore);

  readonly resources = computed(() =>
    CRUD_RESOURCES.filter(
      (resource) =>
        !this.session.authEnabled || this.session.canPermission(resource.permission),
    ),
  );
}
