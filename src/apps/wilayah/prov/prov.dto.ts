import { Transform } from 'class-transformer';
import {
    IsString,
    IsOptional,
    IsDateString,
    IsNotEmpty,
    IsNumberString,
    Length,
    Matches
} from 'class-validator';
import { upperCase, upperCaseFirst, handleEmptyToNull } from 'src/utils/utils';

export class ProvinsiDto {
    // Kode Provinsi Angka
    @IsNotEmpty({ message: 'Kode Provinsi Angka harus diisi!' })
    @IsNumberString(
        { no_symbols: true },
        { message: 'Kode Provinsi Angka harus berupa angka!' }
    )
    @Length(2, 2, { message: 'Kode Provinsi Angka harus 2 digit!' })
    readonly kodeAngka!: string;

    // Kode Provinsi Huruf
    @IsNotEmpty({ message: 'Kode Provinsi Huruf harus diisi!' })
    @Matches(/^[A-Za-z]+$/, { message: 'Kode Provinsi Huruf harus berupa huruf!' })
    @Length(2, 2, { message: 'Kode Provinsi Huruf harus 2 digit!' })
    @Transform(
        ({ value }) => {
            return upperCase(value);
        },
        {
            toClassOnly: true
        }
    )
    readonly kodeHuruf!: string;

    // Nama Provinsi
    @IsNotEmpty({ message: 'Nama Provinsi harus diisi!' })
    @IsString()
    @Length(3, 35, { message: 'Nama Provinsi harus 3-35 karakter!' })
    @Transform(
        ({ value }) => {
            const sanitizedValue = handleEmptyToNull(value);
            return sanitizedValue ? upperCaseFirst(sanitizedValue) : null;
        },
        {
            toClassOnly: true
        }
    )
    readonly namaProvinsi!: string;

    // Kependekan Provinsi
    @IsOptional()
    @IsString()
    @Length(0, 10, { message: 'Kependekan Provinsi maksimal 10 karakter!' })
    @Transform(
        ({ value }) => {
            const sanitizedValue = handleEmptyToNull(value);
            return sanitizedValue ? upperCaseFirst(sanitizedValue) : null;
        },
        {
            toClassOnly: true
        }
    )
    readonly kependekan?: string;

    // Ibu Kota Provinsi
    @IsOptional()
    @IsString()
    @Length(0, 15, { message: 'Ibu Kota Provinsi maksimal 15 karakter!' })
    @Transform(
        ({ value }) => {
            const sanitizedValue = handleEmptyToNull(value);
            return sanitizedValue ? upperCaseFirst(sanitizedValue) : null;
        },
        {
            toClassOnly: true
        }
    )
    readonly ibuKota?: string;

    // Wilayah Geografis
    @IsNotEmpty({ message: 'Wilayah Geografis harus diisi!' })
    @IsString()
    @Length(3, 15, { message: 'Wilayah Geografis harus 3-15 karakter!' })
    @Transform(
        ({ value }) => {
            return upperCaseFirst(value);
        },
        {
            toClassOnly: true
        }
    )
    readonly wilayahGeografis!: string;

    // Tangal Hari Jadi Provinsi
    @IsOptional()
    @Transform(
        ({ value }) => {
            if (!value) return undefined;
            return typeof value === 'string' ? new Date(value) : value;
        },
        { toClassOnly: true }
    )
    @IsDateString()
    readonly tanggalHariJadi?: string;

    // Tangal Pembentukan Provinsi
    @IsOptional()
    @Transform(
        ({ value }) => {
            if (!value) return undefined;
            return typeof value === 'string' ? new Date(value) : value;
        },
        { toClassOnly: true }
    )
    @IsDateString()
    readonly tanggalPembentukan?: string;

    // UU Provinsi
    @IsOptional()
    @IsString()
    @Length(0, 8, { message: 'Undang-Undang Provinsi maksimal 8 karakter!' })
    @Transform(({ value }) => (value == '' || value === undefined ? null : value), {
        toClassOnly: true
    })
    readonly undangUndang?: string;

    // URL Lambang Provinsi
    @IsOptional()
    @IsString()
    @Transform(
        ({ value }) => {
            return handleEmptyToNull(value);
        },
        {
            toClassOnly: true
        }
    )
    readonly urlLambang?: string;
}
