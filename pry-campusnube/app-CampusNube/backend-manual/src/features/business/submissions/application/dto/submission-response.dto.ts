import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubmissionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  referenceId: number;

  @ApiProperty({ example: '2026-09-01T08:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2026-09-01T10:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ example: 85 })
  total: number;

  @ApiProperty({ example: 'COMPLETED' })
  status: string;

  @ApiPropertyOptional({
    example: 'Entrega realizada correctamente.',
  })
  observations?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
