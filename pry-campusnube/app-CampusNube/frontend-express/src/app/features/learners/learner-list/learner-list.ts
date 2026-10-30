import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Learner, LearnerPayload } from '../../../core/models/learner.model';
import { NotificationService } from '../../../core/services/notification';
import { toApiMessage } from '../../../core/utils/api-error';
import { filterRows } from '../../../core/utils/filter-rows';
import { EmptyState } from '../../../shared/ui/empty-state/empty-state';
import { PageHeader } from '../../../shared/ui/page-header/page-header';
import { StatusTag } from '../../../shared/ui/status-tag/status-tag';
import { LearnerApi } from '../learner-api';
import { LearnerForm } from '../learner-form/learner-form';

@Component({
  selector: 'app-learner-list',
  imports: [
    ButtonModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    PageHeader,
    StatusTag,
    TableModule,
    TagModule,
    TooltipModule,
    LearnerForm,
  ],
  templateUrl: './learner-list.html',
  styleUrl: './learner-list.css',
})
export class LearnerList {
  private readonly api = inject(LearnerApi);
  private readonly notify = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  readonly rows = signal<Learner[]>([]);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal('');

  readonly visibleRows = computed(() =>
    filterRows(this.rows(), this.filter(), (learner) => [
      learner.id,
      learner.name,
      learner.description,
      learner.status,
    ]),
  );

  readonly dialogVisible = signal(false);
  readonly editing = signal<Learner | null>(null);
  readonly resetKey = signal(0);

  readonly title = computed(() =>
    this.editing() ? 'Editar aprendiz' : 'Nuevo aprendiz',
  );

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.api.list().subscribe({
      next: (rows) => {
        this.rows.set(rows);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        this.rows.set([]);
        this.error.set(toApiMessage(error));
        this.loading.set(false);
      },
    });
  }

  openCreate(): void {
    this.editing.set(null);
    this.resetKey.update((key) => key + 1);
    this.dialogVisible.set(true);
  }

  openEdit(learner: Learner): void {
    this.editing.set(learner);
    this.resetKey.update((key) => key + 1);
    this.dialogVisible.set(true);
  }

  save(payload: LearnerPayload): void {
    const current = this.editing();
    this.saving.set(true);

    const request = current
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.dialogVisible.set(false);
        this.notify.success(
          current ? 'Aprendiz actualizado' : 'Aprendiz creado',
        );
        this.load();
      },
      error: (error: unknown) => {
        this.saving.set(false);
        this.notify.error('No se pudo guardar', toApiMessage(error));
      },
    });
  }

  deactivate(learner: Learner): void {
    this.confirmation.confirm({
      header: 'Baja lógica',
      message: `¿Desactivar a ${learner.name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(learner.id).subscribe({
          next: () => {
            this.notify.warn('Aprendiz desactivado');
            this.load();
          },
          error: (error: unknown) =>
            this.notify.error(
              'No se pudo desactivar',
              toApiMessage(error),
            ),
        });
      },
    });
  }

  remove(learner: Learner): void {
    this.confirmation.confirm({
      header: 'Eliminar definitivamente',
      message: `Se eliminará a ${learner.name}. Esta acción no se puede deshacer.`,
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.remove(learner.id).subscribe({
          next: () => {
            this.notify.success('Aprendiz eliminado');
            this.load();
          },
          error: (error: unknown) =>
            this.notify.error(
              'No se pudo eliminar',
              toApiMessage(error),
            ),
        });
      },
    });
  }
}
