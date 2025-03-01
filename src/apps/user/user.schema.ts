import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IsEmail, IsString, IsNotEmpty, IsEnum} from 'class-validator';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User'
}

export enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive'
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  NETRAL = 'Netral'
}

// Definisikan schema `User`
@Schema()
export class User extends Document {
  // definisikan properti `username`
  @Prop({unique: true})
  @IsString()
  username!: string;

  // definisikan properti `firstname`
  @Prop({required: true})
  @IsString()
  @IsNotEmpty()
  firstname!: string;

  // definisikan properti `lastname`
  @Prop({required: true})
  @IsString()
  @IsNotEmpty()
  lastname!: string;

  // definisikan properti `email`
  @Prop({required: true, unique: true})
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // definisikan properti `password`
  @Prop({required: true})
  @IsString()
  @IsNotEmpty()
  password!: string;

  // definisikan properti `gender` dengan nilai default
  @Prop()
  @IsEnum(Gender)
  gender!: Gender;

  @Prop({default: 'USER'})
  Role!: UserRole;

  // definisikan properti `status` yang bertipe enum dari `Status` dan memiliki nilai default `ACTIVE`
  @Prop({default: 'ACTIVE'})
  status!: Status;

  // definisikan properti `created_at` dengan nilai default
  @Prop({default: Date.now})
  created_at?: Date;

  // definisikan properti `updated_at` dengan nilai default
  @Prop({default: Date.now})
  updated_at?: Date;
}

// Buat `UserSchema` menggunakan SchemaFactory
export const UserSchema = SchemaFactory.createForClass(User);

// Tambahkan hook pre-save ke `UserSchema`
UserSchema.pre<User>('save', async function (next) {
  // periksa apakah `firstname` atau `lastname` diubah
  if (this.isModified('firstname') || this.isModified('lastname')) {
    // generate sebuah angka acak antara 0 dan 999
    const randomNum = Math.floor(Math.random() * 1000);
    // gabungkan angka acak ke `username`
    this.username = `${this.firstname}${this.lastname}.${randomNum}`;
  }

  // periksa apakah `password` diubah
  if (this.isModified('password')) {
    // generate salt dan hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    // perbarui `password` dengan `password` yang di-hashed
    this.password = hashedPassword;
  }
  // panggil middleware selanjutnya
  next();
});
