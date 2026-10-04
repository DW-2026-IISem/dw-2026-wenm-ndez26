import { UpdateProgressDto } from "./update-progress.dto";

/**
 * Datos de entrada de PATCH /api/progress/:id.
 */
export type PatchProgressDto = Partial<UpdateProgressDto>;
