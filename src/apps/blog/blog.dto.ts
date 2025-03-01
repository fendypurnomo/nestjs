import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty({message: 'Title harus diisi!'})
  readonly title!: string;

  @IsString()
  @IsNotEmpty({message: 'Kategori harus diisi!'})
  readonly category!: string;

  @IsBoolean()
  readonly published?: boolean = false;

  @IsString()
  @IsNotEmpty({message: 'Penulis harus diisi!'})
  readonly author!: string;

  @IsString()
  @IsNotEmpty({message: 'Pengguna harus diisi!'})
  readonly user!: string;

  @IsString()
  readonly image?: string;

  @IsString()
  @IsNotEmpty({message: 'Content harus diisi!'})
  readonly content!: string;

  @IsString()
  readonly tags?: [string];

  @IsBoolean()
  headline?: boolean = false;
}
