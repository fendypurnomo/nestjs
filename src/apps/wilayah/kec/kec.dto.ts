import { IsNotEmpty, Length } from 'class-validator';

export class KecamatanDto {
    @IsNotEmpty({ message: 'Kode Provinsi harus diisi!' })
    @Length(2, 2, { message: 'Kode Provinsi harus 2 karakter Angka!' })
    readonly kodeProvinsi!: string;

    @IsNotEmpty({ message: 'Kode Kab./Kota harus diisi!' })
    @Length(4, 4, { message: 'Kode Kab./Kota harus 4 karakter Angka!' })
    readonly kodeKabKota!: string;

    @IsNotEmpty({ message: 'Kode Kecamatan harus diisi!' })
    @Length(6, 6, { message: 'Kode Kecamatan harus 6 karakter Angka!' })
    readonly kodeKecamatan!: string;

    @IsNotEmpty({ message: 'Nama Kecamatan harus diisi!' })
    readonly namaKecamatan!: string;

    @Length(0, 30, { message: 'Nama Ibu Kota maksimal 30 karakter!' })
    readonly ibuKota!: string;

    readonly luasWilayah!: string;
}
