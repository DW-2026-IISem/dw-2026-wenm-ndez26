import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe.js';

import { CreateLessonDto } from '../../../application/dto/create-lesson.dto.js';
import { LessonFilterDto } from '../../../application/dto/lesson-filter.dto.js';
import { LessonResponseDto } from '../../../application/dto/lesson-response.dto.js';

import { CreateLessonUseCase } from '../../../application/use-cases/create-lesson.use-case.js';
import { DeleteLessonUseCase } from '../../../application/use-cases/delete-lesson.use-case.js';
import { GetLessonUseCase } from '../../../application/use-cases/get-lesson.use-case.js';
import { ListLessonsUseCase } from '../../../application/use-cases/list-lessons.use-case.js';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(
    private readonly createLessonUseCase: CreateLessonUseCase,
    private readonly deleteLessonUseCase: DeleteLessonUseCase,
    private readonly getLessonUseCase: GetLessonUseCase,
    private readonly listLessonsUseCase: ListLessonsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una lección' })
  @ApiCreatedResponse({ type: LessonResponseDto })
  create(@Body() dto: CreateLessonDto) {
    return this.createLessonUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar lecciones' })
  @ApiOkResponse({ type: [LessonResponseDto] })
  findAll(@Query() filter: LessonFilterDto) {
    return this.listLessonsUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una lección por ID' })
  @ApiOkResponse({ type: LessonResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getLessonUseCase.execute(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una lección' })
  @ApiOkResponse({ description: 'Lección eliminada correctamente' })
  delete(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteLessonUseCase.execute(id);
  }
}
