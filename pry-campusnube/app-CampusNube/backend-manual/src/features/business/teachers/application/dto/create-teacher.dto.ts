import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { Status } from '../../../../../common/enums/status.enum.js';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'Carlos Rodríguez',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

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
