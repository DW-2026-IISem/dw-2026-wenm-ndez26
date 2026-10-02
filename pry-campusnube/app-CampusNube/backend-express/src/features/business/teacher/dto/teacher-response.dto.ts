import { TeacherI } from "../teacher.model";

export type TeacherResponseDto = TeacherI;

export const toTeacherResponseDto = (
  teacher: TeacherI
): TeacherResponseDto => {
  return teacher;
};
