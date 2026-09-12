import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateEnrollmentUseCase } from '../../../application/use-cases/create-enrollment.use-case.js';
import { DeleteEnrollmentUseCase } from '../../../application/use-cases/delete-enrollment.use-case.js';
import { GetEnrollmentUseCase } from '../../../application/use-cases/get-enrollment.use-case.js';
import { ListEnrollmentsUseCase } from '../../../application/use-cases/list-enrollments.use-case.js';
import { UpdateEnrollmentUseCase } from '../../../application/use-cases/update-enrollment.use-case.js';

import { CreateEnrollmentDto } from '../../../application/dto/create-enrollment.dto.js';
import { EnrollmentFilterDto } from '../../../application/dto/enrollment-filter.dto.js';
import { UpdateEnrollmentDto } from '../../../application/dto/update-enrollment.dto.js';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(
    private readonly createEnrollmentUseCase: CreateEnrollmentUseCase,
    private readonly deleteEnrollmentUseCase: DeleteEnrollmentUseCase,
    private readonly getEnrollmentUseCase: GetEnrollmentUseCase,
    private readonly listEnrollmentsUseCase: ListEnrollmentsUseCase,
    private readonly updateEnrollmentUseCase: UpdateEnrollmentUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una inscripción' })
  @ApiResponse({ status: 201, description: 'Inscripción creada correctamente' })
  async create(@Body() dto: CreateEnrollmentDto) {
    return this.createEnrollmentUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar inscripciones' })
  @ApiResponse({ status: 200, description: 'Lista de inscripciones' })
  async findAll(@Query() filter: EnrollmentFilterDto) {
    return this.listEnrollmentsUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una inscripción por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getEnrollmentUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una inscripción' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEnrollmentDto,
  ) {
    return this.updateEnrollmentUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una inscripción' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deleteEnrollmentUseCase.execute(id);

    return {
      message: 'Inscripción eliminada correctamente',
    };
  }
}
