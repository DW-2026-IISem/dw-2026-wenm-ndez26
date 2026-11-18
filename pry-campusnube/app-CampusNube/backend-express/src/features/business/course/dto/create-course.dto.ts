export interface CreateCourseDto {
  name: string;
  description?: string;
  isActive?: boolean;
  teacherIds?: number[];
}
