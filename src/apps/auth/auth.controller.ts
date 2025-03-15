import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Request
} from '@nestjs/common';
import {Response} from 'express';
import {UserDto, CheckEmailDto} from 'src/apps/user/user.dto';
import {UserService} from 'src/apps/user/user.service';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './local-auth.guard';
import {Public} from './decorator';

// Dekorator yang menentukan bahwa kelas ini
// adalah controller dengan endpoint `/auth`.
@Controller('auth')
export class AuthController {
  // Konstruktor kelas `AuthController` yang menginisialisasi
  // instance dari `AuthService` dan `UserService`.
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  // Dekorator yang menandai method sebagai
  // endpoint dengan path 'signin'.
  @Post('signin')
  // Method untuk autentikasi masuk (signin)
  // Menerima data autentikasi dari body dan
  // memberikan respon sesuai hasil autentikasi.
  async signin(@Request() req: any, @Res() res: Response): Promise<any> {
    // Mengambil data masukan dan merespon
    // dengan hasil autentikasi dari `AuthService`
    return res.status(HttpStatus.OK).json(req.user);
  }

  @Public()
  // Dekorator yang menandai method sebagai
  // endpoint dengan path 'signup'.
  @Post('signup')
  // Method untuk pendaftaran pengguna (signup)
  // Menerima data pengguna baru dari body dan
  // memberikan respon sesuai hasil pendaftaran.
  async signup(@Body() dto: UserDto, @Res() res: Response): Promise<any> {
    // Melanjutkan proses pendaftaran jika data telah dilengkapi
    const result = await this.userService.createUser(dto);
    return res.status(HttpStatus.CREATED).json(result);
  }

  @Public()
  // Dekorator yang menandai method sebagai
  // endpoint dengan path 'forgot-password'.
  @Post('forgot-password')
  // Method untuk lupa kata sandi (forgot-password)
  // Menerima data email dari body dan memberikan respon
  // sesuai hasil pengiriman tautan reset kata sandi.
  async forgotPassword(@Body() dto: CheckEmailDto, @Res() res: Response): Promise<any> {
    // Mengirimkan tautan reset kata sandi melalui `AuthService`
    const result = await this.authService.sendResetPasswordLink(dto);
    return res.status(HttpStatus.OK).json(result);
  }
}
