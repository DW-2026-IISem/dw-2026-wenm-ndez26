export interface UpdateEnrollmentDto {
  learner_id: number;
  course_id: number;
  enrollment_date?: Date;
  name?: string | null;
  description?: string | null;
  isActive?: boolean;
}
