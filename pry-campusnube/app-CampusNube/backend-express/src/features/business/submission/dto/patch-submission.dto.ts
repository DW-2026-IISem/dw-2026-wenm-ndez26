import { UpdateSubmissionDto } from "./update-submission.dto";

/**
 * Datos de entrada de PATCH /api/entregas/:id.
 */
export type PatchSubmissionDto = Partial<UpdateSubmissionDto>;
