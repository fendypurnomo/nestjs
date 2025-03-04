import {
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res
} from '@nestjs/common';
import { Response } from 'express';

import { ProvinsiService } from './provinsi.service';
import { Public } from 'src/apps/auth/decorator';

@Controller('provinsi')
export class ProvinsiController {
    constructor(private service: ProvinsiService) {}

    // Tambah data
    @Post()
    create() {}

    // Dapatkan semua data
    @Public()
    @Get()
    async findAll(@Res() res: Response): Promise<any> {
        const prov = await this.service.findAll();
        return res.status(HttpStatus.OK).json(prov);
    }

    // Dapatkan 1 data
    @Public()
    @Get(':id')
    async findOne(@Param('id') id: number, @Res() res: Response): Promise<any> {
        const prov = await this.service.findOne(id);
        return res.status(HttpStatus.OK).json(prov);
    }

    // Perbarui data
    @Put(':id')
    update() {}

    // Hapus data
    @Delete(':id')
    remove() {}
}
