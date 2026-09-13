import { Status } from '../../../../../../common/enums/status.enum.js';
import { EvaluationModel } from '../models/evaluation.model.js';

export async function seedEvaluations(): Promise<void> {
  const existing = await EvaluationModel.count();

  if (existing > 0) {
    return;
  }

  await EvaluationModel.bulkCreate([
    {
      courseId: 1,
      name: 'Evaluación de fundamentos',
      description: 'Evaluación sobre los conceptos fundamentales del curso.',
      isActive: Status.ACTIVE,
    },
    {
      courseId: 1,
      name: 'Evaluación final',
      description: 'Evaluación final del curso.',
      isActive: Status.ACTIVE,
    },
    {
      courseId: 2,
      name: 'Evaluación inicial',
      description: 'Evaluación de conceptos iniciales.',
      isActive: Status.ACTIVE,
    },
  ]);
}
