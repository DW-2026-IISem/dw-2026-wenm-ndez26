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

export class CreateAttemptDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  enrollmentId: number;

  @ApiProperty({ example: 'Primer intento' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiPropertyOptional({
    example: 'Primer intento de evaluación.',
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
