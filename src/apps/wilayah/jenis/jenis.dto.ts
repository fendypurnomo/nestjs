import { IsNotEmpty, Length } from 'class-validator';

export class JenisDto {
    @IsNotEmpty({ message: 'Nama jenis harus diisi!' })
    @Length(3, 10, { message: 'Nama jenis maksimal 10 karakter!' })
    readonly jenis!: string;
}
