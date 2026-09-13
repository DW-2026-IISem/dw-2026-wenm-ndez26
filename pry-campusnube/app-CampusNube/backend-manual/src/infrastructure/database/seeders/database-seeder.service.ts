import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { seedCourses } from '../../../features/business/courses/infrastructure/persistence/seeders/courses.seeder.js';
import { seedApprentices } from '../../../features/business/apprentices/infrastructure/persistence/seeders/apprentices.seeder.js';
import { seedEnrollments } from '../../../features/business/enrollment/infrastructure/persistence/seeders/enrollments.seeder.js';
import { seedModules } from '../../../features/business/learning-content/infrastructure/persistence/seeders/modules.seeder.js';
import { seedTeachers } from '../../../features/business/teachers/infrastructure/persistence/seeders/teachers.seeder.js';
import { seedEvaluations } from '../../../features/business/assessments/infrastructure/persistence/seeders/evaluations.seeder.js';
import { seedAttempts } from '../../../features/business/assessments/infrastructure/persistence/seeders/attempts.seeder.js';
import { seedSubmissions } from '../../../features/business/submissions/infrastructure/persistence/seeders/submissions.seeder.js';
import { seedProgress } from '../../../features/business/progress/infrastructure/persistence/seeders/progress.seeder.js';
import { seedCertificates } from '../../../features/business/certificates/infrastructure/persistence/seeders/certificates.seeder.js';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseSeederService.name);

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    try {
      await seedCourses();
      await seedApprentices();
      await seedEnrollments();
      await seedModules();
      await seedTeachers();
      await seedEvaluations();
      await seedAttempts();
      await seedSubmissions();
      await seedProgress();      
      await seedCertificates();
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
