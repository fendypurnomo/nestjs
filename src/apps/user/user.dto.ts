import {OmitType} from '@nestjs/mapped-types';
import {IsEmail, IsString, IsNotEmpty, IsEnum} from 'class-validator';
import {Gender} from './user.schema';

/* Definisikan kelas `SignupDto` */
export class UserDto {
  // Gunakan decorator `@IsString`
  // untuk memastikan nilai `firstname` adalah string
  //
  // Gunakan decorator `@IsNotEmpty`
  // untuk memastikan nilai `firstname` tidak kosong
  //
  // Definisikan properti `firstname`
  // sebagai string yang hanya bisa dibaca
  @IsString()
  @IsNotEmpty({message: 'Nama depan harus diisi!'})
  readonly firstname!: string;

  // Gunakan decorator `@IsString`
  // untuk memastikan nilai `lastname` adalah string
  //
  // Gunakan decorator `@IsNotEmpty`
  // untuk memastikan nilai `lastname` tidak kosong
  //
  // Definisikan properti `lastname`
  // sebagai string yang hanya bisa dibaca
  @IsString()
  @IsNotEmpty({message: 'Nama belakang harus diisi!'})
  readonly lastname!: string;

  // Gunakan decorator `@IsEmail` untuk memastikan
  // nilai `email` adalah alamat email yang valid
  //
  // Gunakan decorator `@IsNotEmpty` untuk memastikan
  // nilai `email` tidak kosong
  //
  // Definisikan properti `email` sebagai string yang hanya bisa dibaca
  @IsEmail({}, {message: 'Alamat email yang Anda masukkan tidak valid!'})
  @IsNotEmpty({message: 'Alamat email harus diisi!'})
  readonly email!: string;

  // Gunakan decorator `@IsString`
  // untuk memastikan nilai `password` adalah string
  //
  // Gunakan decorator `@IsNotEmpty`
  // untuk memastikan nilai `password` tidak kosong
  //
  // Definisikan properti `password`
  // sebagai string yang hanya bisa dibaca
  @IsString()
  @IsNotEmpty({message: 'kata sandi harus diisi!'})
  readonly password!: string;

  // Gunakan decorator `@IsString`
  // untuk memastikan nilai `gender` adalah string
  //
  // Gunakan decorator `@IsNotEmpty`
  // untuk memastikan nilai `gender` tidak kosong
  //
  // Definisikan properti `gender` yang hanya bisa dibaca
  @IsEnum(Gender)
  @IsNotEmpty({message: 'Jenis kelamin harus diisi!'})
  readonly gender!: Gender;
}

/* Definisikan kelas SigninDto */
export class SigninDto extends OmitType(UserDto, [
  'firstname',
  'lastname',
  'gender'
] as const) {}

/* Definisikan kelas ForgotPasswordDto */
export class CheckEmailDto extends OmitType(UserDto, [
  'firstname',
  'lastname',
  'password',
  'gender'
] as const) {}
