import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  referenceId: number;

  @ApiProperty({ example: '2026-09-01T08:00:00Z' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-09-01T10:00:00Z' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 85 })
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty({ example: 'COMPLETED' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;

  @ApiPropertyOptional({
    example: 'Entrega realizada correctamente.',
  })
  @IsOptional()
  @IsString()
  observations?: string;
}
