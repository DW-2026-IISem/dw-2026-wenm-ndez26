import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum.js';

export class LessonResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  moduleId: number;

  @ApiProperty({
    example: '¿Qué es el desarrollo web?',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'Introducción al desarrollo de aplicaciones web.',
  })
  description?: string;

  @ApiPropertyOptional({
    example: 'Conceptos básicos del desarrollo web.',
  })
  content?: string;

  @ApiProperty({ example: 1 })
  order: number;

  @ApiProperty({
    enum: Status,
    example: Status.ACTIVE,
  })
  status: Status;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
