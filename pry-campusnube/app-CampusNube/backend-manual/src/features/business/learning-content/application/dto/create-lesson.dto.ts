import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  moduleId: number;

  @ApiProperty({ example: '¿Qué es el desarrollo web?' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Introducción al desarrollo de aplicaciones web.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'Conceptos básicos del desarrollo web.',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  order: number;
}
