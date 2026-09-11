import { CourseModel } from '../models/course.model.js';
import { Status } from '../../../../../../common/enums/status.enum.js';

export async function seedCourses(): Promise<void> {
  const count = await CourseModel.count();

  if (count > 0) {
    return;
  }

  await CourseModel.bulkCreate([
    {
      name: 'Introducción al Desarrollo Web',
      description: 'Fundamentos para crear aplicaciones web modernas.',
      status: Status.ACTIVE,
    },
    {
      name: 'Programación con TypeScript',
      description: 'Conceptos y prácticas de programación usando TypeScript.',
      status: Status.ACTIVE,
    },
  ]);
}
