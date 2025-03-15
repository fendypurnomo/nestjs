import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ApiResponse } from 'src/utils/utils';
import { GeoDto } from './geo.dto';
import { GeoEntity } from './geo.entity';
import { GeoRepository } from './geo.repository';

@Injectable()
export class GeoService {
    constructor(private readonly geoRepo: GeoRepository) {}

    async create(data: GeoDto): Promise<ApiResponse> {
        const create = await this.geoRepo.create(data);
        if (!create || create.length < 1)
            throw new HttpException(
                {
                    success: false,
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

    async findAll(): Promise<ApiResponse<GeoEntity[]>> {
        const data = await this.geoRepo.findAll();
        if (!data.length)
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found'
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

    async findById(id: number): Promise<ApiResponse<GeoEntity>> {
        const data = await this.geoRepo.findById(id);
        if (!data.length)
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found'
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

    async findByName(name: string): Promise<ApiResponse<GeoEntity>> {
        const data = await this.geoRepo.findByName(name);
        if (!data.length)
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found'
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

    async update(id: number, data: GeoDto): Promise<ApiResponse> {
        const checkId = await this.geoRepo.findById(id);
        if (!checkId.length)
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'ID not found!'
                },
                HttpStatus.NOT_FOUND
            );

        const update = await this.geoRepo.update(id, data);
        if (!update.length)
            throw new HttpException(
                {
                    success: false,
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
        const checkId = await this.geoRepo.findById(id);
        if (!checkId.length)
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'ID not found'
                },
                HttpStatus.NOT_FOUND
            );

        const del = await this.geoRepo.delete(id);
        if (!del.length)
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not deleted!'
                },
                HttpStatus.OK
            );

        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data deleted'
        };
    }
}
