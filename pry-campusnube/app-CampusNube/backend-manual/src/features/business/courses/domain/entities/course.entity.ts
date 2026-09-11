import { Status } from '../../../../../common/enums/status.enum.js';

export interface CourseProps {
  id?: number;
  name: string;
  description?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Course {
  id?: number;
  name: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: CourseProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<CourseProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>,
  ): Course {
    if (!props.name?.trim()) {
      throw new Error('El nombre del curso es requerido');
    }

    return new Course(props);
  }

  static reconstitute(props: CourseProps): Course {
    return new Course(props);
  }

  update(
    props: Partial<
      Omit<CourseProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.name !== undefined) {
      if (!props.name.trim()) {
        throw new Error('El nombre del curso es requerido');
      }

      this.name = props.name;
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
