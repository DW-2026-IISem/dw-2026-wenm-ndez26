import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forbidden.html',
})
export class Forbidden {
  private readonly route = inject(ActivatedRoute);

  readonly permission =
    this.route.snapshot.queryParamMap.get('permission');
}
