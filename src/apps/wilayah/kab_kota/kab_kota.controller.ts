import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { KabKotaService } from './kab_kota.service';
import { Public } from 'src/apps/auth/decorator';
import { ApiResponse } from 'src/utils/utils';
import { KabKotaDto } from './kab_kota.dto';
import { KabKotaEntity } from './kab_kota.entity';

@Controller('kabupatenKota')
export class KabKotaController {
    constructor(private readonly service: KabKotaService) {}

    // Tambah data
    @Post()
    async create(@Body() data: KabKotaDto): Promise<ApiResponse> {
        return this.service.create(data);
    }

    // Dapatkan semua data
    @Public()
    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number
    ): Promise<ApiResponse<KabKotaEntity[]>> {
        return this.service.findAll(page, pageSize);
    }

    // Dapatkan 1 data
    @Public()
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ApiResponse<KabKotaEntity>> {
        return this.service.findById(id);
    }

    // Perbarui data
    @Public()
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: KabKotaDto
    ): Promise<ApiResponse> {
        return this.service.update(id, data);
    }

    // Hapus data
    @Public()
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<ApiResponse> {
        return this.service.delete(id);
    }
}
