import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum.js';

export class EvaluationResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  courseId: number;

  @ApiProperty({ example: 'Evaluación de fundamentos' })
  name: string;

  @ApiPropertyOptional({
    example: 'Evaluación sobre los conceptos fundamentales del curso.',
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
