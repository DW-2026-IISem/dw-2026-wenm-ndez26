import { Status } from '../../../../../common/enums/status.enum.js';

export interface ApprenticeProps {
  id?: number;
  name: string;
  description?: string;
  status?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Apprentice {
  id?: number;
  name: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: ApprenticeProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.status = props.status ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<
      ApprenticeProps,
      'id' | 'status' | 'createdAt' | 'updatedAt'
    >,
  ): Apprentice {
    if (!props.name?.trim()) {
      throw new Error('El nombre del aprendiz es requerido');
    }

    return new Apprentice(props);
  }

  static reconstitute(props: ApprenticeProps): Apprentice {
    return new Apprentice(props);
  }

  update(
    props: Partial<
      Omit<ApprenticeProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.name !== undefined) {
      if (!props.name.trim()) {
        throw new Error('El nombre del aprendiz es requerido');
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
