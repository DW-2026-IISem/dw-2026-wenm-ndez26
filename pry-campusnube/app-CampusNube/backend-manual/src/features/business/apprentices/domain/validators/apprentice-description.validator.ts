export function isValidApprenticeDescription(
  description?: string,
): boolean {
  return description === undefined || description.length <= 500;
}
