import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProgressDto } from '../../application/dto/create-progress.dto.js';
import { UpdateProgressDto } from '../../application/dto/update-progress.dto.js';
import { ProgressMapper } from '../../application/mappers/progress.mapper.js';
import { CreateProgressUseCase } from '../../application/use-cases/create-progress.use-case.js';
import { DeleteProgressUseCase } from '../../application/use-cases/delete-progress.use-case.js';
import { GetProgressUseCase } from '../../application/use-cases/get-progress.use-case.js';
import { ListProgressUseCase } from '../../application/use-cases/list-progress.use-case.js';
import { UpdateProgressUseCase } from '../../application/use-cases/update-progress.use-case.js';

@ApiTags('progress')
@Controller('progress')
export class ProgressController {
  constructor(
    private readonly createProgress: CreateProgressUseCase,
    private readonly deleteProgress: DeleteProgressUseCase,
    private readonly getProgress: GetProgressUseCase,
    private readonly listProgress: ListProgressUseCase,
    private readonly updateProgress: UpdateProgressUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateProgressDto) {
    return ProgressMapper.toResponse(
      await this.createProgress.execute(dto),
    );
  }

  @Get()
  async findAll() {
    const progress = await this.listProgress.execute();

    return progress.map((item) => ProgressMapper.toResponse(item));
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return ProgressMapper.toResponse(
      await this.getProgress.execute(id),
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgressDto,
  ) {
    return ProgressMapper.toResponse(
      await this.updateProgress.execute(id, dto),
    );
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteProgress.execute(id);

    return { message: 'Progreso eliminado correctamente' };
  }
}
