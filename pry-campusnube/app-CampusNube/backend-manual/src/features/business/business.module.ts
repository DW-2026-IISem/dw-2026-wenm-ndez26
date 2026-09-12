import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';
import { ApprenticesModule } from './apprentices/apprentices.module.js';

@Module({
  imports: [
    CoursesModule,
    EnrollmentModule,
    ApprenticesModule,
  ],
  exports: [
    CoursesModule,
    EnrollmentModule,
    ApprenticesModule,
  ],
})
export class BusinessModule {}
