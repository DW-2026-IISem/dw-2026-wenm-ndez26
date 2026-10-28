
import { Component, computed, effect, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';

export interface Curso {
  nombre: string;
  precio: number;
  activo: boolean;
}

@Component({
  host: { class: 'block' },
  selector: 'app-ejemplo',
  imports: [
    ButtonModule,
    CardModule,
    DecimalPipe,
    InputTextModule,
    MessageModule,
    TagModule,
  ],
  templateUrl: './ejemplo.html',
  styleUrl: './ejemplo.css',
})
export class Ejemplo {
  protected readonly curso = signal<Curso>(cursoInicial());

  protected readonly precioFinal = computed(() =>
    Math.round(this.curso().precio * 1.19),
  );

  protected readonly estadoTexto = computed(() =>
    this.curso().activo ? 'Activo' : 'Inactivo',
  );

  private readonly registro = effect(() => {
    const { nombre, precio, activo } = this.curso();

    console.log(
      `[CampusNube] ${nombre} · precio ${precio} · ${
        activo ? 'activo' : 'inactivo'
      }`,
    );
  });

  protected cambiarNombre(event: Event): void {
    const nombre = (event.target as HTMLInputElement).value;

    this.curso.update((actual) => ({ ...actual, nombre }));
  }

  protected variarPrecio(delta: number): void {
    this.curso.update((actual) => ({
      ...actual,
      precio: Math.max(0, actual.precio + delta),
    }));
  }

  protected alternarEstado(): void {
    this.curso.update((actual) => ({
      ...actual,
      activo: !actual.activo,
    }));
  }

  protected reiniciar(): void {
    this.curso.set(cursoInicial());
  }
}

function cursoInicial(): Curso {
  return {
    nombre: 'Introducción a la Seguridad y Salud en el Trabajo',
    precio: 18000,
    activo: true,
  };
}
