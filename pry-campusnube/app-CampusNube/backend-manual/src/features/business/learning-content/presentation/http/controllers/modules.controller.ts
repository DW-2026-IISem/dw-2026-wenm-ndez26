import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateModuleDto } from '../../../application/dto/create-module.dto.js';
import { UpdateModuleDto } from '../../../application/dto/update-module.dto.js';
import { CreateModuleUseCase } from '../../../application/use-cases/create-module.use-case.js';
import { DeleteModuleUseCase } from '../../../application/use-cases/delete-module.use-case.js';
import { GetModuleUseCase } from '../../../application/use-cases/get-module.use-case.js';
import { ListModulesUseCase } from '../../../application/use-cases/list-modules.use-case.js';
import { UpdateModuleUseCase } from '../../../application/use-cases/update-module.use-case.js';

@Controller('modules')
export class ModulesController {
  constructor(
    private readonly createModuleUseCase: CreateModuleUseCase,
    private readonly listModulesUseCase: ListModulesUseCase,
    private readonly getModuleUseCase: GetModuleUseCase,
    private readonly updateModuleUseCase: UpdateModuleUseCase,
    private readonly deleteModuleUseCase: DeleteModuleUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateModuleDto) {
    return this.createModuleUseCase.execute(dto);
  }

  @Get()
  findAll(@Query('courseId') courseId?: string) {
    return this.listModulesUseCase.execute({
      courseId: courseId ? Number(courseId) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getModuleUseCase.execute(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateModuleDto,
  ) {
    return this.updateModuleUseCase.execute(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.deleteModuleUseCase.execute(id);

    return { message: 'Módulo eliminado' };
  }
}
