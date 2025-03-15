import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ApiResponse } from 'src/utils/utils';
import { KabKotaDto } from './kab_kota.dto';
import { KabKotaEntity } from './kab_kota.entity';
import { KabKotaRepository } from './kab_kota.repository';

@Injectable()
export class KabKotaService {
    constructor(private readonly kabKotaRepo: KabKotaRepository) {}

    async create(data: KabKotaDto): Promise<ApiResponse> {
        const create = await this.kabKotaRepo.create(data);
        if (!create.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not created!'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data created'
        };
    }

    async findAll(page: number, pageSize: number): Promise<ApiResponse<KabKotaEntity[]>> {
        const data = await this.kabKotaRepo.findAll(page, pageSize);
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

    async findById(id: number): Promise<ApiResponse<KabKotaEntity>> {
        const data = await this.kabKotaRepo.findById(id);
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

    async update(id: number, data: KabKotaDto): Promise<ApiResponse> {
        const checkId = await this.kabKotaRepo.findById(id);
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

        const update = await this.kabKotaRepo.update(id, data);
        if (!update.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not updated!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data updated'
        };
    }

    async delete(id: number): Promise<ApiResponse> {
        const checkId = await this.kabKotaRepo.findById(id);
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

        const del = await this.kabKotaRepo.delete(id);
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
