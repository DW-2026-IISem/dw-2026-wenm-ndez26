export interface CreateLessonDto {
  module_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}
