import { ModuleModel } from '../models/module.model.js';

export async function seedModules(): Promise<void> {
  const existing = await ModuleModel.count();

  if (existing > 0) {
    return;
  }

  await ModuleModel.bulkCreate([
    {
      courseId: 1,
      title: 'Introducción al curso',
      description: 'Conceptos fundamentales del curso.',
      order: 1,
    },
    {
      courseId: 1,
      title: 'Fundamentos',
      description: 'Fundamentos principales del aprendizaje.',
      order: 2,
    },
    {
      courseId: 2,
      title: 'Conceptos iniciales',
      description: 'Introducción a los conceptos principales.',
      order: 1,
    },
  ]);
}
