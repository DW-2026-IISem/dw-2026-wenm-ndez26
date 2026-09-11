import { PartialType } from '@nestjs/swagger';
import { CourseCreateDto } from './course-create.dto.js';

export class CourseUpdateDto extends PartialType(CourseCreateDto) {}
