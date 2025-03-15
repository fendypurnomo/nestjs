import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ApiResponse } from 'src/utils/utils';
import { JenisDto } from './jenis.dto';
import { JenisEntity } from './jenis.entity';
import { JenisRepository } from './jenis.repository';

@Injectable()
export class JenisService {
    constructor(private readonly jenisRepo: JenisRepository) {}

    async create(data: JenisDto): Promise<ApiResponse> {
        const create = await this.jenisRepo.create(data);
        if (!create || create.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not created!'
                },
                HttpStatus.BAD_REQUEST
            );

        return {
            success: true,
            statusCode: HttpStatus.CREATED,
            message: 'Data created'
        };
    }

    async findAll(): Promise<ApiResponse<JenisEntity[]>> {
        const data = await this.jenisRepo.findAll();
        if (!data || data.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findById(id: number): Promise<ApiResponse<JenisEntity>> {
        const data = await this.jenisRepo.findById(id);
        if (!data || data.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async findByJenis(jenis: string): Promise<ApiResponse<JenisEntity>> {
        const data = await this.jenisRepo.findByJenis(jenis);
        if (!data || data.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    async update(id: number, data: JenisDto): Promise<ApiResponse> {
        const checkId = await this.jenisRepo.findById(id);
        if (!checkId || checkId.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'ID not found!'
                },
                HttpStatus.NOT_FOUND
            );

        const update = await this.jenisRepo.update(id, data);
        if (!update || update.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not updated!'
                },
                HttpStatus.BAD_REQUEST
            );

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data updated'
        };
    }

    async delete(id: number): Promise<ApiResponse> {
        const checkId = await this.jenisRepo.findById(id);
        if (!checkId || checkId.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'ID not found!'
                },
                HttpStatus.NOT_FOUND
            );

        const del = await this.jenisRepo.delete(id);
        if (!del || del.length < 1)
            throw new HttpException(
                {
                    success: true,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not deleted!'
                },
                HttpStatus.BAD_REQUEST
            );

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data deleted'
        };
    }
}
