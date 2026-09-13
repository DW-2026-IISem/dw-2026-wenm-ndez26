import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CreateAttemptDto } from '../../../application/dto/create-attempt.dto.js';
import { AttemptResponseDto } from '../../../application/dto/attempt-response.dto.js';
import { UpdateAttemptDto } from '../../../application/dto/update-attempt.dto.js';

import { CreateAttemptUseCase } from '../../../application/use-cases/create-attempt.use-case.js';
import { DeleteAttemptUseCase } from '../../../application/use-cases/delete-attempt.use-case.js';
import { GetAttemptUseCase } from '../../../application/use-cases/get-attempt.use-case.js';
import { ListAttemptsUseCase } from '../../../application/use-cases/list-attempts.use-case.js';
import { UpdateAttemptUseCase } from '../../../application/use-cases/update-attempt.use-case.js';

@ApiTags('attempts')
@Controller('attempts')
export class AttemptsController {
  constructor(
    private readonly createAttemptUseCase: CreateAttemptUseCase,
    private readonly deleteAttemptUseCase: DeleteAttemptUseCase,
    private readonly getAttemptUseCase: GetAttemptUseCase,
    private readonly listAttemptsUseCase: ListAttemptsUseCase,
    private readonly updateAttemptUseCase: UpdateAttemptUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear intento' })
  @ApiCreatedResponse({ type: AttemptResponseDto })
  async create(
    @Body() dto: CreateAttemptDto,
  ): Promise<AttemptResponseDto> {
    return this.createAttemptUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar intentos' })
  @ApiQuery({
    name: 'enrollmentId',
    required: false,
    type: Number,
  })
  @ApiOkResponse({ type: [AttemptResponseDto] })
  async findAll(
    @Query('enrollmentId') enrollmentId?: string,
  ): Promise<AttemptResponseDto[]> {
    const parsedEnrollmentId =
      enrollmentId !== undefined
        ? Number(enrollmentId)
        : undefined;

    return this.listAttemptsUseCase.execute(
      parsedEnrollmentId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener intento por ID' })
  @ApiOkResponse({ type: AttemptResponseDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AttemptResponseDto> {
    return this.getAttemptUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar intento' })
  @ApiOkResponse({ type: AttemptResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAttemptDto,
  ): Promise<AttemptResponseDto> {
    return this.updateAttemptUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar intento' })
  @ApiNoContentResponse()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.deleteAttemptUseCase.execute(id);
  }
}
