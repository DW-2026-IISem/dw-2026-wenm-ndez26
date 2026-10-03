export interface CreateModuleDto {
  course_id: number;
  name: string;
  description?: string;
  isActive?: boolean;
}
