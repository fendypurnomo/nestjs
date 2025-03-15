import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class KabKotaDto {
    @IsNotEmpty({ message: 'Kode provinsi harus diisi!' })
    @Length(2, 2, { message: 'Kode provinsi harus 2 karakter!' })
    @IsNumber()
    readonly kodeProvinsi!: string;

    @IsNotEmpty({ message: 'Kode kab./kota harus diisi!' })
    @Length(4, 4, { message: 'Kode Kab./Kota harus 4 karakter!' })
    readonly kodeKabKota!: string;

    @IsNotEmpty({ message: 'Jenis wilayah harus diisi!' })
    @Length(3, 10, { message: 'Nama jenis wilayah maksimal 10 karakter!' })
    readonly jenis!: string;

    @IsNotEmpty({ message: 'Nama Kab./Kota harus diisi!' })
    @Length(3, 40, { message: 'Nama Kab./Kota maksimal 40 karakter!' })
    readonly namaKabKota!: string;

    @Length(0, 30, { message: 'Nama Ibu kota maksimal 30 karakter!' })
    readonly ibuKota!: string;

    @Length(0, 15, { message: 'Undang-undang maksimal 15 karakter!' })
    readonly undangUndang!: string;

    readonly urlLambang!: string;

    readonly luasWilayah!: string;
}
