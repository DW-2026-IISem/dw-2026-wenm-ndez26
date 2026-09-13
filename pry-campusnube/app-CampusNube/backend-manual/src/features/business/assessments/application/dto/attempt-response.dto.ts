import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum.js';

export class AttemptResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  enrollmentId: number;

  @ApiProperty({ example: 'Primer intento' })
  name: string;

  @ApiPropertyOptional({
    example: 'Primer intento de evaluación.',
  })
  description?: string;

  @ApiProperty({
    enum: Status,
    example: Status.ACTIVE,
  })
  isActive: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
