import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';

import {UserDto} from './user.dto';
import {User} from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly model: Model<User>) {}

  async getUsers(page: number, limit: number): Promise<User[] | any> {
    try {
      const skip = (page - 1) * limit;
      const users = await this.model.find().skip(skip).limit(limit).exec();

      if (!users || !users.length)
        throw new NotFoundException({
          statusCode: 404,
          statusError: 'usersEmpty',
          message: 'Tidak ada data Pengguna/User!'
        });

      const count: number = await this.model.countDocuments().exec();
      const pages: number = Math.ceil(count / limit);

      return {data: users, totalData: count, totalPages: pages};
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Terjadi kesalahan saat melakukan proses signin: ${error.message}`
      );
    }
  }

  async getUserById(userId: string): Promise<User | any> {
    try {
      const user = await this.model.findById(userId).exec();
      if (!user)
        throw new NotFoundException({
          statusCode: 404,
          statusError: 'userIdNotExist',
          message: `Pengguna dengan ID: "${userId}" tidak ditemukan atau belum terdaftar!`
        });

      return {data: user};
    } catch (error: any) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Terjadi kesalahan saat melakukan proses signin: ${error.message}`
      );
    }
  }

  async createUser(data: Partial<UserDto>): Promise<User | any> {
    try {
      const isEmailTaken = await this.model
        .findOne({email: data.email})
        .then((emailTaken) => (emailTaken ? true : false));
      if (isEmailTaken)
        throw new ConflictException({
          statusCode: 409,
          statusError: 'emailTaken',
          message: {
            email: `Maaf, alamat email: "${data.email}" yang Anda masukkan telah digunakan!`
          }
        });

      const newUser = new this.model(data);
      const createdUser = await newUser.save();
      if (createdUser) return {data: createdUser};
    } catch (error: any) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException(
        `Terjadi kesalahan saat melakukan proses signin: ${error.message}`
      );
    }
  }

  async updateUser(userId: string, data: Partial<UserDto>): Promise<User | any> {
    try {
      const hashedPassword = bcrypt.hashSync(data.password as string, 10);
      const updatedData = Object.assign({}, data, {password: hashedPassword});
      const result = await this.model
        .findByIdAndUpdate(userId, updatedData, {new: true})
        .exec();

      if (!result)
        throw new BadRequestException({
          statusCode: 400,
          statusError: 'failed',
          message: `Gagal memperbarui data dengan ID: ${userId}`
        });

      return true;
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        `Terjadi kesalahan saat melakukan proses signin: ${error.message}`
      );
    }
  }

  async deleteUser(userId: string): Promise<any> {
    try {
      const deletedUser = await this.model.findByIdAndDelete(userId);
      if (!deletedUser)
        throw new BadRequestException({
          statusCode: 400,
          statusError: 'failed',
          message: `Terjadi kesalahan saat menghapus data dengan ID: ${userId}`
        });

      return {
        status: 'success',
        message: 'Berhasil menghapus data pengguna.'
      };
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException(
        `Terjadi kesalahan saat melakukan proses signin: ${error.message}`
      );
    }
  }
}
