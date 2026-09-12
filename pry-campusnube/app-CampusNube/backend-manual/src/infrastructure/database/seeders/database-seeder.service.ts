import {
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';

import { seedCourses } from '../../../features/business/courses/infrastructure/persistence/seeders/courses.seeder.js';
import { seedLearningContent } from '../../../features/business/learning-content/infrastructure/persistence/seeders/learning-content.seeder.js';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private readonly logger = new Logger(
    DatabaseSeederService.name,
  );

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    try {
      await seedCourses();
      await seedLearningContent();

      this.logger.log('✅ Seeders ejecutados');
    } catch (error: any) {
      this.logger.error(
        `❌ Error en seeders: ${error.message}`,
        error.stack,
      );

      throw error;
    }
  }
}
