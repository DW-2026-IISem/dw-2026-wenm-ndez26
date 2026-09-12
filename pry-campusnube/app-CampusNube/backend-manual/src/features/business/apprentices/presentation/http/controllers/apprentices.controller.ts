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

import { CreateApprenticeUseCase } from '../../../application/use-cases/create-apprentice.use-case.js';
import { DeleteApprenticeUseCase } from '../../../application/use-cases/delete-apprentice.use-case.js';
import { GetApprenticeUseCase } from '../../../application/use-cases/get-apprentice.use-case.js';
import { ListApprenticesUseCase } from '../../../application/use-cases/list-apprentices.use-case.js';
import { UpdateApprenticeUseCase } from '../../../application/use-cases/update-apprentice.use-case.js';

import { CreateApprenticeDto } from '../../../application/dto/create-apprentice.dto.js';
import { ApprenticeFilterDto } from '../../../application/dto/apprentice-filter.dto.js';
import { UpdateApprenticeDto } from '../../../application/dto/update-apprentice.dto.js';

@ApiTags('Apprentices')
@Controller('apprentices')
export class ApprenticesController {
  constructor(
    private readonly createApprenticeUseCase: CreateApprenticeUseCase,
    private readonly deleteApprenticeUseCase: DeleteApprenticeUseCase,
    private readonly getApprenticeUseCase: GetApprenticeUseCase,
    private readonly listApprenticesUseCase: ListApprenticesUseCase,
    private readonly updateApprenticeUseCase: UpdateApprenticeUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un aprendiz' })
  @ApiResponse({
    status: 201,
    description: 'Aprendiz creado correctamente',
  })
  async create(@Body() dto: CreateApprenticeDto) {
    return this.createApprenticeUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar aprendices' })
  @ApiResponse({
    status: 200,
    description: 'Lista de aprendices',
  })
  async findAll(@Query() filter: ApprenticeFilterDto) {
    return this.listApprenticesUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un aprendiz por ID' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.getApprenticeUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un aprendiz' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateApprenticeDto,
  ) {
    return this.updateApprenticeUseCase.execute(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un aprendiz' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.deleteApprenticeUseCase.execute(id);

    return {
      message: 'Aprendiz eliminado correctamente',
    };
  }
}
