import { Status } from '../../../../../common/enums/status.enum.js';

export interface ProgressProps {
  id?: number;
  enrollmentId: number;
  name: string;
  description?: string;
  isActive?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProgressEntity {
  private readonly id?: number;
  private enrollmentId: number;
  private name: string;
  private description?: string;
  private isActive: Status;
  private readonly createdAt?: Date;
  private updatedAt?: Date;

  constructor(props: ProgressProps) {
    this.id = props.id;
    this.enrollmentId = props.enrollmentId;
    this.name = props.name;
    this.description = props.description;
    this.isActive = props.isActive ?? Status.ACTIVE;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  getId(): number | undefined {
    return this.id;
  }

  getEnrollmentId(): number {
    return this.enrollmentId;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getIsActive(): Status {
    return this.isActive;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  update(
    props: Partial<Omit<ProgressProps, 'id' | 'createdAt' | 'updatedAt'>>,
  ): void {
    if (props.enrollmentId !== undefined) {
      this.enrollmentId = props.enrollmentId;
    }

    if (props.name !== undefined) {
      this.name = props.name;
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }

    if (props.isActive !== undefined) {
      this.isActive = props.isActive;
    }

    this.updatedAt = new Date();
  }
}
