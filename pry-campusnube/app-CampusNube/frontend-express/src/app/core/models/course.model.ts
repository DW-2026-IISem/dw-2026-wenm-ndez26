
import { Timestamps } from './api.model';

/**
 * Modelo de lectura para la entidad Course.
 * Refleja los campos definidos en el backend Sequelize.
 */
export interface Course extends Timestamps {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
}

/**
 * Datos para crear un curso.
 */
export interface CoursePayload {
  name: string;
  description?: string | null;
  isActive?: boolean;
}

/**
 * Datos para actualizar un curso.
 * Los campos son opcionales porque pueden enviarse parcialmente.
 */
export interface CourseUpdatePayload {
  name?: string;
  description?: string | null;
}
