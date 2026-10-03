export interface UpdateLessonDto {
  module_id: number;
  name: string;
  description?: string | null;
}
