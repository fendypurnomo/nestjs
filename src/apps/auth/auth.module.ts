import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {PassportModule} from '@nestjs/passport';

import {UserModule} from 'src/apps/user/user.module';
import {User, UserSchema} from 'src/apps/user/user.schema';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {JwtStrategy} from './jwt.strategy';
import {LocalStrategy} from './local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {expiresIn: '120s'}
    }),
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {provide: APP_GUARD, useClass: JwtAuthGuard}
  ],
  exports: [AuthService]
})
export class AuthModule {}
