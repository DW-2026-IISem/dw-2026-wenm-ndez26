import { Module } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module.js';

@Module({
  imports: [CoursesModule],
  exports: [CoursesModule],
})
export class BusinessModule {}
