import { ModuleModel } from '../models/module.model.js';
import { LessonModel } from '../models/lesson.model.js';
import { Status } from '../../../../../../common/enums/status.enum.js';

export async function seedLearningContent(): Promise<void> {
  const moduleCount = await ModuleModel.count();

  if (moduleCount > 0) {
    return;
  }

  const modules = await ModuleModel.bulkCreate([
    {
      courseId: 1,
      name: 'Introducción al desarrollo web',
      description:
        'Conceptos fundamentales del desarrollo web.',
      order: 1,
      status: Status.ACTIVE,
    },
    {
      courseId: 1,
      name: 'Frontend y Backend',
      description:
        'Introducción a las tecnologías frontend y backend.',
      order: 2,
      status: Status.ACTIVE,
    },
    {
      courseId: 2,
      name: 'Fundamentos de TypeScript',
      description:
        'Conceptos básicos del lenguaje TypeScript.',
      order: 1,
      status: Status.ACTIVE,
    },
  ]);

  await LessonModel.bulkCreate([
    {
      moduleId: modules[0].id,
      name: '¿Qué es el desarrollo web?',
      description:
        'Introducción al desarrollo de aplicaciones web.',
      content:
        'Conceptos básicos del desarrollo web.',
      order: 1,
      status: Status.ACTIVE,
    },
    {
      moduleId: modules[0].id,
      name: 'Arquitectura web',
      description:
        'Conceptos de cliente, servidor y API.',
      content:
        'Arquitectura básica de una aplicación web.',
      order: 2,
      status: Status.ACTIVE,
    },
    {
      moduleId: modules[1].id,
      name: 'Frontend',
      description:
        'Introducción al desarrollo frontend.',
      content:
        'HTML, CSS y JavaScript.',
      order: 1,
      status: Status.ACTIVE,
    },
    {
      moduleId: modules[2].id,
      name: 'Tipos de datos',
      description:
        'Tipos de datos principales en TypeScript.',
      content:
        'string, number, boolean y otros tipos.',
      order: 1,
      status: Status.ACTIVE,
    },
  ]);
}
