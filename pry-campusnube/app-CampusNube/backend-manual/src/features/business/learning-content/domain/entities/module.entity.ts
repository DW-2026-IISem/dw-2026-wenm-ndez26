export interface ModuleProps {
  id?: number;
  courseId: number;
  title: string;
  description?: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ModuleEntity {
  private readonly id?: number;
  private courseId: number;
  private title: string;
  private description?: string;
  private order: number;
  private readonly createdAt?: Date;
  private updatedAt?: Date;

  constructor(props: ModuleProps) {
    this.id = props.id;
    this.courseId = props.courseId;
    this.title = props.title;
    this.description = props.description;
    this.order = props.order;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  getId(): number | undefined {
    return this.id;
  }

  getCourseId(): number {
    return this.courseId;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string | undefined {
    return this.description;
  }

  getOrder(): number {
    return this.order;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  update(
    props: Partial<
      Omit<ModuleProps, 'id' | 'createdAt' | 'updatedAt'>
    >,
  ): void {
    if (props.courseId !== undefined) {
      this.courseId = props.courseId;
    }

    if (props.title !== undefined) {
      this.title = props.title;
    }

    if (props.description !== undefined) {
      this.description = props.description;
    }

    if (props.order !== undefined) {
      this.order = props.order;
    }

    this.updatedAt = new Date();
  }
}
