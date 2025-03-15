import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { ProvinsiService } from './prov.service';
import { Public } from 'src/apps/auth/decorator';
import { ProvinsiDto } from './prov.dto';
import { ApiResponse } from 'src/utils/utils';
import { ViewProvinsiEntity } from './prov.entity';

@Controller('provinsi')
export class ProvinsiController {
    constructor(private readonly service: ProvinsiService) {}

    // Tambah data baru
    @Public()
    @Post()
    async create(@Body() data: ProvinsiDto): Promise<ApiResponse> {
        return this.service.create(data);
    }

    // Dapatkan semua data
    @Public()
    @Get()
    async findAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 25
    ): Promise<ApiResponse<ViewProvinsiEntity[]>> {
        return this.service.findAll(page, pageSize);
    }

    // Dapatkan data berdasarkan ID
    @Public()
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ApiResponse<ViewProvinsiEntity>> {
        return this.service.findById(id);
    }

    // Perbarui data
    @Public()
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: ProvinsiDto
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
