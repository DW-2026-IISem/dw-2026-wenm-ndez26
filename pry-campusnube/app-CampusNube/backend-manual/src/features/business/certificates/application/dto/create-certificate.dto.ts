import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

import { Status } from '../../../../../common/enums/status.enum.js';

export class CreateCertificateDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  enrollmentId!: number;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: Status })
  @IsOptional()
  @IsEnum(Status)
  isActive?: Status;
}
