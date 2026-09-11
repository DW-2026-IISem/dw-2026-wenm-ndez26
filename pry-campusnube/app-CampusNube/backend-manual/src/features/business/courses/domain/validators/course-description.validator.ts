export function isValidCourseDescription(
  description?: string,
): boolean {
  if (!description) {
    return true;
  }

  return description.trim().length >= 10;
}
