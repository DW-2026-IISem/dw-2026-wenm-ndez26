import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';
import { LearningContentModule } from './learning-content/learning-content.module.js';

@Module({
  imports: [
    CoursesModule,
    EnrollmentModule,
    LearningContentModule,
  ],

  exports: [
    CoursesModule,
    EnrollmentModule,
    LearningContentModule,
  ],
})
export class BusinessModule {}
