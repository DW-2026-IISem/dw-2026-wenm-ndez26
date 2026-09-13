export interface SubmissionProps {
  id?: number;
  referenceId: number;
  startDate: Date;
  endDate: Date;
  total: number;
  status: string;
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SubmissionEntity {
  private readonly id?: number;
  private referenceId: number;
  private startDate: Date;
  private endDate: Date;
  private total: number;
  private status: string;
  private observations?: string;
  private readonly createdAt?: Date;
  private updatedAt?: Date;

  constructor(props: SubmissionProps) {
    this.id = props.id;
    this.referenceId = props.referenceId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.total = props.total;
    this.status = props.status;
    this.observations = props.observations;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  getId(): number | undefined {
    return this.id;
  }

  getReferenceId(): number {
    return this.referenceId;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getTotal(): number {
    return this.total;
  }

  getStatus(): string {
    return this.status;
  }

  getObservations(): string | undefined {
    return this.observations;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  update(
    props: Partial<Omit<SubmissionProps, 'id' | 'createdAt' | 'updatedAt'>>,
  ): void {
    if (props.referenceId !== undefined) {
      this.referenceId = props.referenceId;
    }

    if (props.startDate !== undefined) {
      this.startDate = props.startDate;
    }

    if (props.endDate !== undefined) {
      this.endDate = props.endDate;
    }

    if (props.total !== undefined) {
      this.total = props.total;
    }

    if (props.status !== undefined) {
      this.status = props.status;
    }

    if (props.observations !== undefined) {
      this.observations = props.observations;
    }

    this.updatedAt = new Date();
  }
}
