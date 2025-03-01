import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';

import {AuthModule} from './apps/auth/auth.module';
import {BlogModule} from './apps/blog/blog.module';
import {HomeModule} from './apps/home/home.module';
import {UserModule} from './apps/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.DB_URI_LOCAL}`),
    AuthModule,
    BlogModule,
    HomeModule,
    UserModule
  ]
})
export class AppModule {}
