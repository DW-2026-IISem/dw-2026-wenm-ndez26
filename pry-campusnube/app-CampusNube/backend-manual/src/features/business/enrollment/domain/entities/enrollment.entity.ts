import { Status } from '../../../../../common/enums/status.enum.js';

export interface EnrollmentProps {
  id?: number;
  apprenticeId: number;
  courseId: number;
  status?: Status;
  enrolledAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Enrollment {
  id?: number;
  apprenticeId: number;
  courseId: number;
  status: Status;
  enrolledAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor(props: EnrollmentProps) {
    this.id = props.id;
    this.apprenticeId = props.apprenticeId;
    this.courseId = props.courseId;
    this.status = props.status ?? Status.ACTIVE;
    this.enrolledAt = props.enrolledAt;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    props: Omit<
      EnrollmentProps,
      'id' | 'status' | 'createdAt' | 'updatedAt'
    >,
  ): Enrollment {
    if (!props.apprenticeId) {
      throw new Error('El aprendiz es requerido');
    }

    if (!props.courseId) {
      throw new Error('El curso es requerido');
    }

    return new Enrollment(props);
  }

  static reconstitute(props: EnrollmentProps): Enrollment {
    return new Enrollment(props);
  }

  deactivate(): void {
    this.status = Status.INACTIVE;
  }
}
