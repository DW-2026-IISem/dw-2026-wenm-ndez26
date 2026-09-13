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

import { CreateCertificateDto } from '../../../application/dto/create-certificate.dto.js';
import { UpdateCertificateDto } from '../../../application/dto/update-certificate.dto.js';
import { CertificateMapper } from '../../../application/mappers/certificate.mapper.js';
import { CreateCertificateUseCase } from '../../../application/use-cases/create-certificate.use-case.js';
import { DeleteCertificateUseCase } from '../../../application/use-cases/delete-certificate.use-case.js';
import { GetCertificateUseCase } from '../../../application/use-cases/get-certificate.use-case.js';
import { ListCertificatesUseCase } from '../../../application/use-cases/list-certificates.use-case.js';
import { UpdateCertificateUseCase } from '../../../application/use-cases/update-certificate.use-case.js';

@ApiTags('certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(
    private readonly createCertificate: CreateCertificateUseCase,
    private readonly deleteCertificate: DeleteCertificateUseCase,
    private readonly getCertificate: GetCertificateUseCase,
    private readonly listCertificates: ListCertificatesUseCase,
    private readonly updateCertificate: UpdateCertificateUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateCertificateDto) {
    const certificate = await this.createCertificate.execute(dto);

    return CertificateMapper.toResponse(certificate);
  }

  @Get()
  async findAll() {
    const certificates = await this.listCertificates.execute();

    return certificates.map((certificate) =>
      CertificateMapper.toResponse(certificate),
    );
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const certificate = await this.getCertificate.execute(id);

    return CertificateMapper.toResponse(certificate);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCertificateDto,
  ) {
    const certificate = await this.updateCertificate.execute(id, dto);

    return CertificateMapper.toResponse(certificate);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.deleteCertificate.execute(id);

    return {
      message: 'Certificado eliminado correctamente',
    };
  }
}
