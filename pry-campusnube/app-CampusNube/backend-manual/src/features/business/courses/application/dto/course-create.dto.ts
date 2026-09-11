import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CourseCreateDto {
  @ApiProperty({
    example: 'Introducción al Desarrollo Web',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional({
    example: 'Fundamentos para crear aplicaciones web modernas.',
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  description?: string;
}
