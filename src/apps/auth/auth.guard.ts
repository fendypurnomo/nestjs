import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

import {jwtSecret} from './auth.constant';

// Dekorator untuk mengecek apakah user sudah login atau belum
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  // fungsi `canActivate` ini akan dipanggil sebelum memulai `route` yang diakses
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Mengambil instance permintaan (request) dari konteks eksekusi
    const request = context.switchToHttp().getRequest();
    // Mengekstrak token dari header permintaan
    const token = this.extractTokenFromHeader(request);
    // Jika tidak ada token, lempar pengecualian `UnauthorizedException`
    if (!token)
      throw new UnauthorizedException({
        statusCode: 401,
        statusError: 'unauthorized',
        message: 'Maaf, Anda tidak memiliki akses token yang valid!'
      });

    try {
      // Verifikasi token menggunakan layanan JwtService
      // dan secret key yang telah didefinisikan
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtSecret
      });
      // Jika token valid, simpan `payload` pengguna ke dalam permintaan
      request['user'] = payload;
    } catch {
      // Jika terjadi kesalahan saat verifikasi token,
      // lempar pengecualian `UnauthorizedException`
      throw new UnauthorizedException({
        statusCode: 401,
        statusError: 'unauthorized',
        message: 'Maaf, akses token Anda tidak valid/telah kadaluwarsa!'
      });
    }
    // Jika semua berjalan dengan lancar, kembalikan nilai
    // `true` untuk menunjukkan bahwa pengguna diotorisasi
    return true;
  }

  // fungsi pribadi untuk mengekstrak `token` dari `header permintaan`
  private extractTokenFromHeader(request: Request): string | undefined {
    // Mengekstrak `tipe` dan `token` dari header otorisasi
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // Jika tipe adalah `Bearer`, kembalikan `token`,
    // jika tidak, kembalikan `undefined`
    return type === 'Bearer' ? token : undefined;
  }
}
