export interface CreateLearnerDto {
  name: string;
  description?: string;
  password: string;
  status?: "active" | "inactive";
}
