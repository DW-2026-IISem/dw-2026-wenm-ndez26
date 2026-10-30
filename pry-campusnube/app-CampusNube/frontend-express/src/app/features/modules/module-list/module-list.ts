import {
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import {
  ConfirmationService,
  MessageService
} from 'primeng/api';

import { Module, ModulePayload } from '../../../core/models/module.model';
import { Course } from '../../../core/models/course.model';

import { ModuleApi } from '../module-api';
import { CourseApi } from '../../courses/course-api';
import { ModuleForm } from '../module-form/module-form';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    TagModule,
    TooltipModule,
    ConfirmDialogModule,
    ToastModule,
    ModuleForm
  ],
  providers: [
    ConfirmationService,
    MessageService
  ],
  templateUrl: './module-list.html',
  styleUrl: './module-list.css',
})
export class ModuleList implements OnInit {

  private readonly api = inject(ModuleApi);
  private readonly coursesApi = inject(CourseApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly rows = signal<Module[]>([]);
  readonly courses = signal<Course[]>([]);

  readonly loading = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);

  readonly search = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedModule = signal<Module | null>(null);

  // Indicador de módulos activos.
  readonly activeModuleCount = computed(
    () => this.rows().filter((module) => module.isActive).length,
  );

  // Relación entre el identificador y el nombre del curso.
  readonly courseName = computed(() => {
    const map = new Map(
      this.courses().map((course) => [course.id, course.name])
    );

    return (id: number) => map.get(id) ?? `Curso #${id}`;
  });

  // Búsqueda por nombre, descripción y curso.
  readonly filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (!term) {
      return this.rows();
    }

    return this.rows().filter((module) => {
      const course = this.courseName()(module.course_id);

      return (
        module.name.toLowerCase().includes(term) ||
        (module.description ?? '').toLowerCase().includes(term) ||
        course.toLowerCase().includes(term)
      );
    });
  });

  ngOnInit(): void {
    this.load();
  }

  // Cargar módulos y cursos en paralelo.
  load(): void {
    this.loading.set(true);
    this.error.set(null);

    forkJoin({
      modules: this.api.list(),
      courses: this.coursesApi.list()
    }).subscribe({
      next: ({ modules, courses }) => {
        this.rows.set(modules);
        this.courses.set(courses);
        this.loading.set(false);
      },
      error: (error: unknown) => {
        console.error('Error al cargar módulos:', error);
        this.error.set(
          'No fue posible cargar los módulos y cursos.'
        );
        this.loading.set(false);
      }
    });
  }

  // Abrir formulario para registrar.
  openCreate(): void {
    this.selectedModule.set(null);
    this.dialogVisible.set(true);
  }

  // Abrir formulario para editar.
  openEdit(module: Module): void {
    this.selectedModule.set(module);
    this.dialogVisible.set(true);
  }

  // Cerrar formulario.
  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedModule.set(null);
  }

  // Guardar o actualizar módulo.
  save(payload: ModulePayload): void {
    this.saving.set(true);

    const current = this.selectedModule();

    const request = current
      ? this.api.update(current.id, payload)
      : this.api.create(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.closeDialog();

        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: current
            ? 'Módulo actualizado correctamente.'
            : 'Módulo registrado correctamente.',
          life: 3000
        });

        this.load();
      },
      error: (error: unknown) => {
        console.error('Error al guardar módulo:', error);
        this.saving.set(false);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible guardar el módulo.',
          life: 4000
        });
      }
    });
  }

  // Desactivación lógica.
  deactivate(module: Module): void {
    this.confirmationService.confirm({
      header: 'Confirmar desactivación',
      message: `¿Desea desactivar el módulo "${module.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.api.deactivate(module.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Módulo desactivado',
              detail: 'El módulo fue desactivado correctamente.',
              life: 3000
            });

            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al desactivar módulo:', error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible desactivar el módulo.',
              life: 4000
            });
          }
        });
      }
    });
  }

  // Eliminación física.
  remove(module: Module): void {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de eliminar definitivamente el módulo "${module.name}"?`,
      icon: 'pi pi-trash',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.api.remove(module.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Módulo eliminado',
              detail: 'El módulo fue eliminado correctamente.',
              life: 3000
            });

            this.load();
          },
          error: (error: unknown) => {
            console.error('Error al eliminar módulo:', error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No fue posible eliminar el módulo.',
              life: 4000
            });
          }
        });
      }
    });
  }
}
