import { Component, computed, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { Status } from '../../../core/models/api.model';

@Component({
  selector: 'app-status-tag',
  standalone: true,
  imports: [TagModule],
  host: { class: 'inline-block' },
  templateUrl: './status-tag.html',
  styleUrl: './status-tag.css',
})
export class StatusTag {
  readonly status = input.required<Status>();

  readonly label = computed(() =>
    this.status() === 'active' ? 'Activo' : 'Inactivo'
  );

  readonly severity = computed<'success' | 'danger'>(() =>
    this.status() === 'active' ? 'success' : 'danger'
  );
}