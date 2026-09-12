import { Status } from '../../../../../common/enums/status.enum.js';

export interface LessonProps {
  id?: number;
  moduleId: number;
  name: string;
  description?: string;
  content?: string;
  order: number;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Lesson {
  id?: number;
  moduleId: number;
  name: string;
  description?: string;
  content?: string;
  order: number;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: LessonProps) {
    this.id = props.id;
    this.moduleId = props.moduleId;
    this.name = props.name;
    this.description = props.description;
    this.content = props.content;
    this.order = props.order;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<
      LessonProps,
      'id' | 'status' | 'createdAt' | 'updatedAt'
    >,
  ): Lesson {
    if (!props.moduleId) {
      throw new Error('El módulo es requerido');
    }

    if (!props.name?.trim()) {
      throw new Error('El nombre de la lección es requerido');
    }

    if (!Number.isInteger(props.order) || props.order < 1) {
      throw new Error(
        'El orden de la lección debe ser un entero mayor a 0',
      );
    }

    return new Lesson(props);
  }

  static reconstitute(props: LessonProps): Lesson {
    return new Lesson(props);
  }

  update(
    props: Partial<
      Omit<LessonProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.moduleId !== undefined) {
      this.moduleId = props.moduleId;
    }

    if (props.name !== undefined) {
      if (!props.name.trim()) {
        throw new Error('El nombre de la lección es requerido');
      }

      this.name = props.name;
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }

    if (props.content !== undefined) {
      this.content = props.content;
    }

    if (props.order !== undefined) {
      if (!Number.isInteger(props.order) || props.order < 1) {
        throw new Error(
          'El orden de la lección debe ser un entero mayor a 0',
        );
      }

      this.order = props.order;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
