import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { GeoRepository } from 'src/apps/wilayah/geo/geo.repository';
import { ApiResponse } from 'src/utils/utils';
import { ProvinsiDto } from './prov.dto';
import { ProvinsiEntity, ViewProvinsiEntity } from './prov.entity';
import { ProvinsiRepository } from './prov.repository';

@Injectable()
export class ProvinsiService {
    // Tambahkan repository ke service untuk mengakses data dari database
    constructor(
        private readonly provRepo: ProvinsiRepository,
        private readonly geoRepo: GeoRepository
    ) {}

    /*
     * Method Tambah data baru ke database dengan DTO sebagai parameter input
     * dan mengembalikan ApiResponse sebagai output dari service tersebut
     * atau throw error jika data tidak berhasil ditambahkan
     *
     * @param data
     * @throws HttpException
     * @returns Promise<ApiResponse>
     */
    async create(data: ProvinsiDto): Promise<ApiResponse> {
        // Periksa apakah kode angka sudah ada di database,
        // jika sudah ada, lemparkan error
        const checkKodeAngka = await this.provRepo.findByKodeAngka(data.kodeAngka);
        if (checkKodeAngka.length > 0) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Kode Provinsi Angka "${data.kodeAngka}" telah digunakan!`
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // Periksa apakah kode huruf sudah ada di database,
        // jika sudah ada, lemparkan error
        const checkKodeHuruf = await this.provRepo.findByKodeHuruf(data.kodeHuruf);
        if (checkKodeHuruf.length > 0) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Kode Provinsi Huruf "${data.kodeHuruf}" telah digunakan!`
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // Periksa apakah nama provinsi sudah ada di database,
        // jika sudah ada, lemparkan error
        const checkNama = await this.provRepo.findByNama(data.namaProvinsi);
        if (checkNama.length > 0) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Nama Provinsi "${data.namaProvinsi}" sudah ada!`
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // Periksa apakah kependekan provinsi sudah ada di database,
        // jika sudah ada, lemparkan error
        const checkKependekan = await this.provRepo.findByKependekan(data.kependekan);
        if (checkKependekan.length > 0) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: `Nama Kependekan Provinsi "${data.kependekan}" sudah ada!`
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // Periksa apakah wilayah geografis ada di database,
        // jika tidak ada, lemparkan error
        const checkGeo = await this.geoRepo.findByName(data.wilayahGeografis);
        if (!checkGeo.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: `Wilayah Geografis "${data.wilayahGeografis}" yang Anda masukkan tidak ada!`
                },
                HttpStatus.NOT_FOUND
            );
        }

        // Jika semua data valid, tambahkan data ke database
        // dan periksa apakah data berhasil ditambahkan
        // jika tidak berhasil, lemparkan error
        const create = await this.provRepo.create(data);
        if (!create || create.length === 0) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Data not created!'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // jika berhasil, kembalikan pesan berhasil
        return {
            success: true,
            statusCode: HttpStatus.CREATED,
            message: 'Data created'
        };
    }

    /*
     * Method Dapatkan semua data dari database dan kembalikan data tersebut
     * dalam bentuk ApiResponse jika data ditemukan
     * atau throw error jika tidak ditemukan data tersebut
     *
     * @throws HttpException
     * @returns Promise<ApiResponse>
     */
    async findAll(
        page: number = 1,
        pageSize: number = 25
    ): Promise<ApiResponse<ViewProvinsiEntity[]>> {
        // Pastikan page & pageSize minimal 1
        if (page < 1 || pageSize < 1) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Page & pageSize harus lebih dari 0'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // Dapatkan data dari database
        // dan periksa apakah data ditemukan
        // jika tidak ditemukan, lemparkan error
        const data = await this.provRepo.findAll(page, pageSize);
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

        // jika data ditemukan, kembalikan data tersebut
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    /*
     * Method dapatkan data berdasarkan ID dari database dan kembalikan data tersebut
     * dalam bentuk ApiResponse jika data ditemukan
     * atau throw error jika tidak ditemukan data tersebut
     *
     * @param id
     * @throws HttpException
     * @returns Promise<ApiResponse>
     */
    async findById(id: number): Promise<ApiResponse<ProvinsiEntity>> {
        // Dapatkan data berdasarkan ID
        // dan periksa apakah data ditemukan
        // jika tidak ditemukan, lemparkan error
        const data = await this.provRepo.findById(id);
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

        // jika data ditemukan, kembalikan data tersebut
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data found',
            data
        };
    }

    /*
     * Method perbarui data berdasarkan ID dengan DTO sebagai parameter input
     * dan mengembalikan ApiResponse sebagai output dari service tersebut
     * atau throw error jika data tidak berhasil diupdate
     *
     * @param id
     * @param data
     * @throws HttpException
     * @returns Promise<ApiResponse>
     */
    async update(id: number, data: ProvinsiDto): Promise<ApiResponse> {
        // Periksa ID, jika ID tidak ditemukan,
        // lemparkan error
        const update = await this.provRepo.update(id, data);
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

        // jika berhasil, kembalikan pesan berhasil
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data updated'
        };
    }

    /*
     * Method hapus data berdasarkan ID dari database
     * dan mengembalikan ApiResponse sebagai output dari service tersebut
     * atau throw error jika data tidak berhasil dihapus
     *
     * @param id
     * @throws HttpException
     * @returns Promise<ApiResponse>
     */
    async delete(id: number): Promise<ApiResponse> {
        // Periksa ID, jika ID tidak ditemukan,
        // lemparkan error
        const checkId = await this.provRepo.findById(id);
        if (!checkId.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Data not found!'
                },
                HttpStatus.NOT_FOUND
            );
        }

        // Jika ID ditemukan, hapus data tersebut dari database
        // dan periksa apakah data berhasil dihapus
        // jika tidak berhasil, lemparkan error
        const del = await this.provRepo.delete(id);
        if (!del.length) {
            throw new HttpException(
                {
                    success: false,
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Failed to delete data!'
                },
                HttpStatus.BAD_REQUEST
            );
        }

        // jika berhasil, kembalikan pesan berhasil
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Data deleted'
        };
    }
}
