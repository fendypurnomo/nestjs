import { IsNotEmpty, Length } from 'class-validator';

export class GeoDto {
    @IsNotEmpty({ message: 'Nama geografis harus diisi!' })
    @Length(3, 15, { message: 'Nama geografis maksimal 15 karakter!' })
    readonly geografis!: string;
}
