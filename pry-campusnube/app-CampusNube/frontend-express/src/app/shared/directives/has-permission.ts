import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input
} from '@angular/core';

import { SessionStore } from '../../core/auth/session.store';

@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private readonly template = inject(TemplateRef<unknown>);
  private readonly container = inject(ViewContainerRef);
  private readonly session = inject(SessionStore);

  readonly appHasPermission = input.required<string>();

  private visible = false;

  constructor() {
    effect(() => {
      const permission = this.appHasPermission();
      const allowed = this.session.canPermission(permission);

      if (allowed && !this.visible) {
        this.container.createEmbeddedView(this.template);
        this.visible = true;
      } else if (!allowed && this.visible) {
        this.container.clear();
        this.visible = false;
      }
    });
  }
}
