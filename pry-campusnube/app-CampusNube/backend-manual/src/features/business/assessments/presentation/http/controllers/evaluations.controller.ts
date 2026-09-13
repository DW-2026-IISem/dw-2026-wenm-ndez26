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

import { CreateEvaluationDto } from '../../../application/dto/create-evaluation.dto.js';
import { EvaluationResponseDto } from '../../../application/dto/evaluation-response.dto.js';
import { UpdateEvaluationDto } from '../../../application/dto/update-evaluation.dto.js';

import { CreateEvaluationUseCase } from '../../../application/use-cases/create-evaluation.use-case.js';
import { DeleteEvaluationUseCase } from '../../../application/use-cases/delete-evaluation.use-case.js';
import { GetEvaluationUseCase } from '../../../application/use-cases/get-evaluation.use-case.js';
import { ListEvaluationsUseCase } from '../../../application/use-cases/list-evaluations.use-case.js';
import { UpdateEvaluationUseCase } from '../../../application/use-cases/update-evaluation.use-case.js';

@ApiTags('evaluations')
@Controller('evaluations')
export class EvaluationsController {
  constructor(
    private readonly createEvaluationUseCase: CreateEvaluationUseCase,
    private readonly deleteEvaluationUseCase: DeleteEvaluationUseCase,
    private readonly getEvaluationUseCase: GetEvaluationUseCase,
    private readonly listEvaluationsUseCase: ListEvaluationsUseCase,
    private readonly updateEvaluationUseCase: UpdateEvaluationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear evaluación' })
  @ApiCreatedResponse({ type: EvaluationResponseDto })
  async create(
    @Body() dto: CreateEvaluationDto,
  ): Promise<EvaluationResponseDto> {
    return this.createEvaluationUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar evaluaciones' })
  @ApiQuery({
    name: 'courseId',
    required: false,
    type: Number,
  })
  @ApiOkResponse({ type: [EvaluationResponseDto] })
  async findAll(
    @Query('courseId') courseId?: string,
  ): Promise<EvaluationResponseDto[]> {
    const parsedCourseId =
      courseId !== undefined ? Number(courseId) : undefined;

    return this.listEvaluationsUseCase.execute(parsedCourseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener evaluación por ID' })
  @ApiOkResponse({ type: EvaluationResponseDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EvaluationResponseDto> {
    return this.getEvaluationUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar evaluación' })
  @ApiOkResponse({ type: EvaluationResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEvaluationDto,
  ): Promise<EvaluationResponseDto> {
    return this.updateEvaluationUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar evaluación' })
  @ApiNoContentResponse()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.deleteEvaluationUseCase.execute(id);
  }
}
