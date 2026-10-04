/**
 * Datos de entrada de PUT /api/progress/:id.
 *
 * isActive no forma parte del update normal.
 * El cambio de estado se realiza mediante deactivate.
 */
export interface UpdateProgressDto {
  enrollment_id: number;
  name: string;
  description?: string | null;
}
