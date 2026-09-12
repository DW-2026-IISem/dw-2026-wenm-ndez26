import { ApprenticeModel } from '../models/apprentice.model.js';
import { Status } from '../../../../../../common/enums/status.enum.js';

export async function seedApprentices(): Promise<void> {
  const count = await ApprenticeModel.count();

  if (count > 0) {
    return;
  }

  await ApprenticeModel.bulkCreate([
    {
      name: 'Juan Pérez',
      description: 'Aprendiz de desarrollo web',
      status: Status.ACTIVE,
    },
    {
      name: 'María Gómez',
      description: 'Aprendiz de programación',
      status: Status.ACTIVE,
    },
  ]);
}
