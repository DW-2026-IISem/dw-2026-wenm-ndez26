import { Status } from '../../../../../../common/enums/status.enum.js';
import { TeacherModel } from '../models/teacher.model.js';

export async function seedTeachers(): Promise<void> {
  const existing = await TeacherModel.count();

  if (existing > 0) {
    return;
  }

  await TeacherModel.bulkCreate([
    {
      name: 'Carlos Rodríguez',
      description: 'Docente encargado de cursos virtuales.',
      isActive: Status.ACTIVE,
    },
    {
      name: 'María González',
      description: 'Docente especializada en aprendizaje virtual.',
      isActive: Status.ACTIVE,
    },
  ]);
}
