import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

import { Status } from '../../../../../common/enums/status.enum.js';

export class CreateEvaluationDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  courseId: number;

  @ApiProperty({ example: 'Evaluación de fundamentos' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({
    example: 'Evaluación sobre los conceptos fundamentales del curso.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: Status,
    example: Status.ACTIVE,
  })
  @IsOptional()
  @IsEnum(Status)
  isActive?: Status;
}
