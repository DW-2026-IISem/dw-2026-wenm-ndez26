
import { Timestamps } from './api.model';

/**
 * Modelo de lectura de un aprendiz.
 * Nunca expone password, aunque exista en la tabla del backend.
 */
export interface Learner extends Timestamps {
  id: number;
  name: string;
  description: string | null;
  status: 'active' | 'inactive';
}

/**
 * Datos para crear un aprendiz.
 * La contraseña solo se incluye en el payload de escritura.
 */
export interface LearnerPayload {
  name: string;
  description?: string | null;
  password?: string;
  status?: 'active' | 'inactive';
}

/**
 * Datos para actualizar un aprendiz.
 * No incluye el estado, que debe gestionarse mediante
 * la operación específica de activación o desactivación.
 */
export interface LearnerUpdatePayload {
  name?: string;
  description?: string | null;
  password?: string;
}
