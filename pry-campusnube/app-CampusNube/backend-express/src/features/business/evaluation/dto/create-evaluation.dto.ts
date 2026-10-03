export interface CreateEvaluationDto {
  course_id: number;
  name: string;
  description?: string;
  isActive?: boolean;
}
