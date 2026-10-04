/**
 * Datos de entrada de POST /api/entregas.
 */
export interface CreateSubmissionDto {
  referencia_id: number;
  lesson_id: number;
  enrollment_id: number;
  fecha_inicio: Date;
  fecha_fin?: Date | null;
  total?: number | null;
  estado: string;
  observaciones?: string | null;
}
