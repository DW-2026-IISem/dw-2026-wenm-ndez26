import { Status } from '../../../../../../common/enums/status.enum.js';
import { AttemptModel } from '../models/attempt.model.js';

export async function seedAttempts(): Promise<void> {
  const existing = await AttemptModel.count();

  if (existing > 0) {
    return;
  }

  await AttemptModel.bulkCreate([
    {
      enrollmentId: 1,
      name: 'Primer intento',
      description: 'Primer intento de evaluación.',
      isActive: Status.ACTIVE,
    },
    {
      enrollmentId: 1,
      name: 'Segundo intento',
      description: 'Segundo intento de evaluación.',
      isActive: Status.ACTIVE,
    },
  ]);
}
