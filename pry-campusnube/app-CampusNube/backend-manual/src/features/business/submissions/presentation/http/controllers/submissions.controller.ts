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

import { CreateSubmissionDto } from '../../../application/dto/create-submission.dto.js';
import { SubmissionResponseDto } from '../../../application/dto/submission-response.dto.js';
import { UpdateSubmissionDto } from '../../../application/dto/update-submission.dto.js';

import { CreateSubmissionUseCase } from '../../../application/use-cases/create-submission.use-case.js';
import { DeleteSubmissionUseCase } from '../../../application/use-cases/delete-submission.use-case.js';
import { GetSubmissionUseCase } from '../../../application/use-cases/get-submission.use-case.js';
import { ListSubmissionsUseCase } from '../../../application/use-cases/list-submissions.use-case.js';
import { UpdateSubmissionUseCase } from '../../../application/use-cases/update-submission.use-case.js';

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly createSubmissionUseCase: CreateSubmissionUseCase,
    private readonly deleteSubmissionUseCase: DeleteSubmissionUseCase,
    private readonly getSubmissionUseCase: GetSubmissionUseCase,
    private readonly listSubmissionsUseCase: ListSubmissionsUseCase,
    private readonly updateSubmissionUseCase: UpdateSubmissionUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear entrega' })
  @ApiCreatedResponse({ type: SubmissionResponseDto })
  async create(
    @Body() dto: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    return this.createSubmissionUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar entregas' })
  @ApiQuery({
    name: 'referenceId',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @ApiOkResponse({ type: [SubmissionResponseDto] })
  async findAll(
    @Query('referenceId') referenceId?: string,
    @Query('status') status?: string,
  ): Promise<SubmissionResponseDto[]> {
    const parsedReferenceId =
      referenceId !== undefined
        ? Number(referenceId)
        : undefined;

    return this.listSubmissionsUseCase.execute(
      parsedReferenceId,
      status,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener entrega por ID' })
  @ApiOkResponse({ type: SubmissionResponseDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubmissionResponseDto> {
    return this.getSubmissionUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar entrega' })
  @ApiOkResponse({ type: SubmissionResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    return this.updateSubmissionUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar entrega' })
  @ApiNoContentResponse()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.deleteSubmissionUseCase.execute(id);
  }
}
