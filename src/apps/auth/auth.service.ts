import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {CheckEmailDto} from 'src/apps/user/user.dto';
import {User} from 'src/apps/user/user.schema';

// Dekorator yang digunakan untuk menginjeksi model `User` ke dalam service ini
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  // validasi `data user (dto)` dengan `database`
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.model.findOne({email: email});
    if (!user)
      return {
        status: 'userNotFound',
        message: {
          email: `Maaf, akun pengguna dengan alamat email: "${email}" tidak dapat kami ditemukan!`
        }
      }

    const passwordMatch = await bcrypt.compare(pass, user.password);
    // kata sandi tidak cocok
    if (!passwordMatch)
      return {
        status: 'incorrectPassword',
        message: {
          password: 'Kata sandi yang Anda masukkan tidak cocok!'
        }
      }

    const accessToken = await this.generateAccessToken(user);
    const {password, ...data} = user.toObject();
    return {data: data, accessToken: accessToken};
  }

  // method untuk `reset password`
  async sendResetPasswordLink(dto: CheckEmailDto): Promise<any> {
    try {
      const user = await this.model.findOne({email: dto.email});
      if (!user)
        throw new NotFoundException({
          statusCode: 404,
          statusError: 'emailNotFound',
          error: {
            email: 'Maaf, kami tidak dapat menemukan alamat email Anda!'
          }
        });

      const accessToken = await this.generateAccessToken(user);

      return {
        message: 'Link setel ulang kata sandi telah kami kirim ke alamat email Anda.',
        access_token: accessToken
      };
    } catch (error: any) {
      // menangani `error` secara spesifik
      if (error instanceof NotFoundException)
        // jika `error` merupakan `NotFoundException`, lemparkan langsung
        throw error;

      // jika jenis `error` tidak dikenali, lemparkan sebagai
      // `InternalServerErrorException` dengan pesan tambahan
      throw new InternalServerErrorException(
        `Terjadi kesalahan saat mengirim link setel ulang kata sandi: ${error.message}`
      );
    }
  }

  // method untuk generate `akses token`
  async generateAccessToken(user: User): Promise<string> {
    const payload = {sub: user._id, email: user.email};
    return await this.jwtService.signAsync(payload);
  }
}
