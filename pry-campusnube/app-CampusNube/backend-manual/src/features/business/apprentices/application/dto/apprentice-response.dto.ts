import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Status } from '../../../../../common/enums/status.enum.js';

export class ApprenticeResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Juan Pérez' })
  name: string;

  @ApiPropertyOptional({
    example: 'Aprendiz de desarrollo web',
  })
  description?: string;

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
