import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum.js';

export class ProgressResponseDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  enrollmentId!: number;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty({ enum: Status })
  isActive!: Status;

  @ApiPropertyOptional()
  createdAt?: Date;

  @ApiPropertyOptional()
  updatedAt?: Date;
}
