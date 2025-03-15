import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { Public } from 'src/apps/auth/decorator';
import { ApiResponse } from 'src/utils/utils';
import { KecamatanDto } from './kec.dto';
import { KecamatanEntity } from './kec.entity';
import { KecamatanService } from './kec.service';

@Controller('kecamatan')
export class KecamatanController {
    constructor(private readonly service: KecamatanService) {}

    @Public()
    @Post()
    async create(@Body() data: KecamatanDto): Promise<ApiResponse> {
        return this.service.create(data);
    }

    @Public()
    @Get()
    async findAll(
        @Query() page: number,
        @Query() pageSize: number
    ): Promise<ApiResponse<KecamatanEntity[]>> {
        return this.service.findAll(page, pageSize);
    }

    @Public()
    @Get(':id')
    async findById(@Param('id') id: number): Promise<ApiResponse<KecamatanEntity>> {
        return this.service.findById(id);
    }

    @Public()
    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() data: KecamatanDto
    ): Promise<ApiResponse> {
        return this.service.update(id, data);
    }

    @Public()
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<ApiResponse> {
        return this.service.delete(id);
    }
}
