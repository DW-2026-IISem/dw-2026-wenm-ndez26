export interface CreateEnrollmentDto {
  learner_id: number;
  course_id: number;
  enrollment_date?: Date;
  status?: "active" | "inactive";
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
}
