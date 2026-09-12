import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';

@Module({
  imports: [
    CoursesModule,
    EnrollmentModule,
  ],
  exports: [
    CoursesModule,
    EnrollmentModule,
  ],
})
export class BusinessModule {}
