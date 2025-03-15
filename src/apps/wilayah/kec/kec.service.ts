import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ApiResponse } from 'src/utils/utils';
import { KecamatanDto } from './kec.dto';
import { KecamatanEntity } from './kec.entity';
import { KecamatanRepository } from './kec.repository';

@Injectable()
export class KecamatanService {
    constructor(private readonly kecRepo: KecamatanRepository) {}

    async create(data: KecamatanDto): Promise<ApiResponse> {
        const create = await this.kecRepo.create(data);
        if (!create.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not found!'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.CREATED,
            message: 'Data created'
        };
    }

    async findAll(
        page: number,
        pageSize: number
    ): Promise<ApiResponse<KecamatanEntity[]>> {
        const data = await this.kecRepo.findAll(page, pageSize);
        if (!data.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findById(id: number): Promise<ApiResponse<KecamatanEntity>> {
        const data = await this.kecRepo.findById(id);
        if (!data.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findByKodeProv(kodeProv: string): Promise<ApiResponse<KecamatanEntity[]>> {
        const data = await this.kecRepo.findByKodeProv(kodeProv);
        if (!data.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findByKodeKabKota(
        kodeKabKota: string
    ): Promise<ApiResponse<KecamatanEntity[]>> {
        const data = await this.kecRepo.findByKodeKabKota(kodeKabKota);
        if (!data.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findByKodeKec(kodeKec: string): Promise<ApiResponse<KecamatanEntity>> {
        const data = await this.kecRepo.findByKodeKec(kodeKec);
        if (!data.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findByName(namaKecamatan: string): Promise<ApiResponse<KecamatanEntity>> {
        const data = await this.kecRepo.findByName(namaKecamatan);
        if (!data.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async update(id: number, data: KecamatanDto): Promise<ApiResponse> {
        const checkId = await this.kecRepo.findById(id);
        if (!checkId.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'ID not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        const update = await this.kecRepo.update(id, data);
        if (!update.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not updated!'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data updated'
        };
    }

    async delete(id: number): Promise<ApiResponse> {
        const checkId = await this.kecRepo.findById(id);
        if (!checkId.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'ID not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        const del = await this.kecRepo.delete(id);
        if (!del.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not deleted!'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data deleted'
        };
    }
}
