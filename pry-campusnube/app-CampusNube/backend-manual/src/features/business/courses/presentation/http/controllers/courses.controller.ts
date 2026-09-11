import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ParsePositiveIntPipe } from '../../../../../../common/pipes/parse-positive-int.pipe.js';

import { CourseCreateDto } from '../../../application/dto/course-create.dto.js';
import { CourseUpdateDto } from '../../../application/dto/course-update.dto.js';
import { CourseFilterDto } from '../../../application/dto/course-filter.dto.js';
import { CourseResponseDto } from '../../../application/dto/course-response.dto.js';

import { CreateCourseUseCase } from '../../../application/use-cases/create-course.use-case.js';
import { UpdateCourseUseCase } from '../../../application/use-cases/update-course.use-case.js';
import { DeleteCourseUseCase } from '../../../application/use-cases/delete-course.use-case.js';
import { GetCourseUseCase } from '../../../application/use-cases/get-course.use-case.js';
import { ListCoursesUseCase } from '../../../application/use-cases/list-courses.use-case.js';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly deleteCourseUseCase: DeleteCourseUseCase,
    private readonly getCourseUseCase: GetCourseUseCase,
    private readonly listCoursesUseCase: ListCoursesUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear un curso' })
  @ApiCreatedResponse({ type: CourseResponseDto })
  create(@Body() dto: CourseCreateDto) {
    return this.createCourseUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar cursos' })
  @ApiOkResponse({ type: [CourseResponseDto] })
  findAll(@Query() filter: CourseFilterDto) {
    return this.listCoursesUseCase.execute(filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un curso por ID' })
  @ApiOkResponse({ type: CourseResponseDto })
  findOne(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.getCourseUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un curso' })
  @ApiOkResponse({ type: CourseResponseDto })
  update(
    @Param('id', ParsePositiveIntPipe) id: number,
    @Body() dto: CourseUpdateDto,
  ) {
    return this.updateCourseUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un curso' })
  @ApiNoContentResponse()
  remove(@Param('id', ParsePositiveIntPipe) id: number) {
    return this.deleteCourseUseCase.execute(id);
  }
}
