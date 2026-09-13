import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module.js';
import { ApprenticesModule } from './apprentices/apprentices.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';
import { LearningContentModule } from './learning-content/learning-content.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { AssessmentsModule } from './assessments/assessments.module.js';

@Module({
  imports: [
    CoursesModule,
    ApprenticesModule,
    EnrollmentModule,
    LearningContentModule,
    TeachersModule,
    AssessmentsModule,
  ],
  exports: [
    CoursesModule,
    ApprenticesModule,
    EnrollmentModule,
    LearningContentModule,
    TeachersModule,
    AssessmentsModule,
  ],
})
export class BusinessModule {}
