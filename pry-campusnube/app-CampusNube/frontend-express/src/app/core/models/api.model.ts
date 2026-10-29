
export type Status = 'active' | 'inactive';

export type Money = number | string;

export interface ApiError {
  error: string;
  detail?: string;
}

/**
 * Fechas que Sequelize agrega automáticamente.
 */
export interface Timestamps {
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Convierte valores numéricos o DECIMAL recibidos
 * como texto en un número seguro para realizar cálculos.
 */
export function toNumber(
  value: Money | null | undefined,
): number {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}
