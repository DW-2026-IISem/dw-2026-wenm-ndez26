import { EnrollmentI } from "../enrollment.model";

export type EnrollmentResponseDto = EnrollmentI;

export const toEnrollmentResponseDto = (
  enrollment: EnrollmentI
): EnrollmentResponseDto => {
  return enrollment;
};
