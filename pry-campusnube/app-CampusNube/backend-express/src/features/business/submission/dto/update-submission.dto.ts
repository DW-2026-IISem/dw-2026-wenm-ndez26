/**
 * Datos de entrada de PUT /api/entregas/:id.
 *
 * `estado` no se incluye aquí porque la desactivación se realiza
 * mediante la operación específica de borrado lógico.
 */
export interface UpdateSubmissionDto {
  referencia_id: number;
  lesson_id: number;
  enrollment_id: number;
  fecha_inicio: Date;
  fecha_fin?: Date | null;
  total?: number | null;
  observaciones?: string | null;
}
