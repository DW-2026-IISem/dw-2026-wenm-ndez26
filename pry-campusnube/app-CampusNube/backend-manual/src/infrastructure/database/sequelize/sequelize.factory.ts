import { createRequire } from 'node:module';

import { Sequelize } from 'sequelize-typescript';

import { DatabaseDialect } from '../../../config/environment/env.interface.js';
import { getSequelizeOptions } from './sequelize.options.js';

import { CourseModel } from '../../../features/business/courses/infrastructure/persistence/models/course.model.js';
import { ApprenticeModel } from '../../../features/business/apprentices/infrastructure/persistence/models/apprentice.model.js';
import { EnrollmentModel } from '../../../features/business/enrollment/infrastructure/persistence/models/enrollment.model.js';

import { ModuleModel } from '../../../features/business/learning-content/infrastructure/persistence/models/module.model.js';
import { LessonModel } from '../../../features/business/learning-content/infrastructure/persistence/models/lesson.model.js';

const require = createRequire(import.meta.url);

export const ALL_MODELS = [
  CourseModel,
  ApprenticeModel,
  EnrollmentModel,
  ModuleModel,
  LessonModel,
];

export async function createSequelizeInstance(
  dialect: DatabaseDialect,
): Promise<Sequelize> {
  const options = getSequelizeOptions(dialect);

  let dialectModule: any;

  switch (dialect) {
    case DatabaseDialect.MySQL:
      dialectModule = require('mysql2');
      break;

    case DatabaseDialect.Postgres:
      dialectModule = require('pg');
      break;

    case DatabaseDialect.MSSQL:
      dialectModule = require('tedious');
      break;

    case DatabaseDialect.Oracle:
      dialectModule = require('oracledb');
      break;

    default:
      throw new Error(`Dialecto no soportado: ${dialect}`);
  }

  const sequelize = new Sequelize({
    ...options,
    dialectModule,
    models: ALL_MODELS,
  });

  try {
    await sequelize.authenticate();

    console.log(
      `✅ Conexión exitosa a ${dialect.toUpperCase()}`,
    );

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();

      console.log('✅ Tablas sincronizadas');
    }
  } catch (error) {
    console.error(
      '❌ Error conectando a la base de datos:',
      error,
    );

    throw error;
  }

  return sequelize;
}
