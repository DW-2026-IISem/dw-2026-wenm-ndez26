import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreateTeacherDto } from '../../../application/dto/create-teacher.dto.js';
import { TeacherResponseDto } from '../../../application/dto/teacher-response.dto.js';
import { UpdateTeacherDto } from '../../../application/dto/update-teacher.dto.js';

import { CreateTeacherUseCase } from '../../../application/use-cases/create-teacher.use-case.js';
import { DeleteTeacherUseCase } from '../../../application/use-cases/delete-teacher.use-case.js';
import { GetTeacherUseCase } from '../../../application/use-cases/get-teacher.use-case.js';
import { ListTeachersUseCase } from '../../../application/use-cases/list-teachers.use-case.js';
import { UpdateTeacherUseCase } from '../../../application/use-cases/update-teacher.use-case.js';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly createTeacherUseCase: CreateTeacherUseCase,
    private readonly deleteTeacherUseCase: DeleteTeacherUseCase,
    private readonly getTeacherUseCase: GetTeacherUseCase,
    private readonly listTeachersUseCase: ListTeachersUseCase,
    private readonly updateTeacherUseCase: UpdateTeacherUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear docente' })
  @ApiCreatedResponse({ type: TeacherResponseDto })
  async create(
    @Body() dto: CreateTeacherDto,
  ): Promise<TeacherResponseDto> {
    return this.createTeacherUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar docentes' })
  @ApiOkResponse({ type: [TeacherResponseDto] })
  async findAll(): Promise<TeacherResponseDto[]> {
    return this.listTeachersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener docente por ID' })
  @ApiOkResponse({ type: TeacherResponseDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TeacherResponseDto> {
    return this.getTeacherUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar docente' })
  @ApiOkResponse({ type: TeacherResponseDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTeacherDto,
  ): Promise<TeacherResponseDto> {
    return this.updateTeacherUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar docente' })
  @ApiNoContentResponse()
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.deleteTeacherUseCase.execute(id);
  }
}
