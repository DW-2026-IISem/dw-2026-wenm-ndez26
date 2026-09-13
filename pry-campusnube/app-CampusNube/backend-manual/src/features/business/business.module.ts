import { Module } from '@nestjDs/common';

import { CoursesModule } from './courses/courses.module.js';
import { ApprenticesModule } from './apprentices/apprentices.module.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';
import { LearningContentModule } from './learning-content/learning-content.module.js';
import { TeachersModule } from './teachers/teachers.module.js';
import { AssessmentsModule } from './assessments/assessments.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';

@Module({
  imports: [
    CoursesModule,
    ApprenticesModule,
    EnrollmentModule,
    LearningContentModule,
    TeachersModule,
    AssessmentsModule,
    SubmissionsModule,
  ],
  exports: [
    CoursesModule,
    ApprenticesModule,
    EnrollmentModule,
    LearningContentModule,
    TeachersModule,
    AssessmentsModule,
    SubmissionsModule,
  ],
})
export class BusinessModule {}
