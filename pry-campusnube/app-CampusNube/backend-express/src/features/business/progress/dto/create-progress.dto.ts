/**
 * Datos de entrada de POST /api/progress.
 */
export interface CreateProgressDto {
  enrollment_id: number;
  name: string;
  description?: string | null;
  isActive?: boolean;
}
