import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { Status } from '../../../../../common/enums/status.enum.js';

export class UpdateTeacherDto {
  @ApiPropertyOptional({
    example: 'Carlos Rodríguez',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  name?: string;

  @ApiPropertyOptional({
    example: 'Docente encargado de cursos virtuales.',
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
