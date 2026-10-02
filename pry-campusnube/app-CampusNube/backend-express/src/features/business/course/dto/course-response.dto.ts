import { CourseI } from "../course.model";

export type CourseResponseDto = CourseI;

export const toCourseResponseDto = (
  course: CourseI
): CourseResponseDto => {
  return course;
};
