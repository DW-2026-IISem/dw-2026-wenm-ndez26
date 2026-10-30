import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Certificate } from '../../../core/models/certificate.model';
import { Enrollment } from '../../../core/models/enrollment.model';
import { CertificateApi } from '../certificate-api';
import { EnrollmentApi } from '../../enrollments/enrollment-api';
import { CertificateForm } from '../certificate-form/certificate-form';

@Component({
  selector: 'app-certificate-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    MessageModule,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule,
    CertificateForm,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './certificate-list.html',
  styleUrl: './certificate-list.css',
})
export class CertificateList {
  private readonly api = inject(CertificateApi);
  private readonly enrollmentApi = inject(EnrollmentApi);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly messageService = inject(MessageService);

  readonly certificates = signal<Certificate[]>([]);
  readonly enrollments = signal<Enrollment[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly search = signal('');

  readonly dialogVisible = signal(false);
  readonly selectedCertificate = signal<Certificate | null>(null);

  constructor() {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    forkJoin({
      certificates: this.api.list(),
      enrollments: this.enrollmentApi.list(),
    }).subscribe({
      next: ({ certificates, enrollments }) => {
        this.certificates.set(certificates);
        this.enrollments.set(enrollments);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(
          error?.error?.message ||
          'No fue posible cargar los certificados y las inscripciones.',
        );
      },
    });
  }

  readonly enrollmentMap = computed(() => {
    const map = new Map<number, string>();

    for (const enrollment of this.enrollments()) {
      map.set(
        enrollment.id,
        `Inscripción #${enrollment.id} — Curso #${enrollment.course_id} — Aprendiz #${enrollment.learner_id}`,
      );
    }

    return map;
  });

  enrollmentLabel(enrollmentId: number): string {
    return (
      this.enrollmentMap().get(enrollmentId) ??
      `Inscripción #${enrollmentId}`
    );
  }

  readonly activeCount = computed(
    () =>
      this.certificates().filter(
        (certificate) => certificate.isActive,
      ).length,
  );

  readonly filteredCertificates = computed(() => {
    const term = this.search().trim().toLowerCase();

    if (!term) {
      return this.certificates();
    }

    return this.certificates().filter((certificate) => {
      const enrollment =
        this.enrollmentMap().get(certificate.enrollment_id) ?? '';

      return (
        String(certificate.id).includes(term) ||
        certificate.name.toLowerCase().includes(term) ||
        (certificate.description ?? '').toLowerCase().includes(term) ||
        enrollment.toLowerCase().includes(term)
      );
    });
  });

  openCreate(): void {
    this.selectedCertificate.set(null);
    this.dialogVisible.set(true);
  }

  openEdit(certificate: Certificate): void {
    this.selectedCertificate.set(certificate);
    this.dialogVisible.set(true);
  }

  closeDialog(): void {
    this.dialogVisible.set(false);
    this.selectedCertificate.set(null);
  }

  onSaved(): void {
    this.closeDialog();
    this.loadData();

    this.messageService.add({
      severity: 'success',
      summary: 'Correcto',
      detail: 'El certificado se guardó correctamente.',
    });
  }

  confirmDeactivate(certificate: Certificate): void {
    this.confirmationService.confirm({
      header: 'Confirmar desactivación',
      message: `¿Deseas desactivar el certificado "${certificate.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => this.deactivate(certificate),
    });
  }

  deactivate(certificate: Certificate): void {
    this.api.deactivate(certificate.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'El certificado fue desactivado.',
        });
        this.loadData();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error?.error?.message ||
            'No fue posible desactivar el certificado.',
        });
      },
    });
  }

  confirmRemove(certificate: Certificate): void {
    this.confirmationService.confirm({
      header: 'Confirmar eliminación',
      message: `¿Deseas eliminar definitivamente el certificado "${certificate.name}"?`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      accept: () => this.remove(certificate),
    });
  }

  remove(certificate: Certificate): void {
    this.api.remove(certificate.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'El certificado fue eliminado.',
        });
        this.loadData();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            error?.error?.message ||
            'No fue posible eliminar el certificado.',
        });
      },
    });
  }
}
