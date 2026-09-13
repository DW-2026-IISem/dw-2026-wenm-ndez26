import { Status } from '../../../../../../common/enums/status.enum.js';
import { ProgressModel } from '../models/progress.model.js';

export async function seedProgress(): Promise<void> {
  const existing = await ProgressModel.count();

  if (existing > 0) {
    return;
  }

  await ProgressModel.bulkCreate([
    {
      enrollmentId: 1,
      name: 'Progreso inicial',
      description: 'Seguimiento inicial del avance del aprendiz.',
      isActive: Status.ACTIVE,
    },
    {
      enrollmentId: 1,
      name: 'Avance de contenidos',
      description: 'Avance registrado en los contenidos del curso.',
      isActive: Status.ACTIVE,
    },
  ]);
}
