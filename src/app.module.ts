import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './apps/auth/auth.module';
import { BlogModule } from './apps/blog/blog.module';
import { HomeModule } from './apps/home/home.module';
import { UserModule } from './apps/user/user.module';
import { WilayahModule } from './apps/wilayah/wilayah.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        // Koneksi ke MongoDB
        MongooseModule.forRoot(`${process.env.MONGO_URI_ATLAS}`),
        AuthModule,
        BlogModule,
        HomeModule,
        UserModule,
        WilayahModule
    ]
})
export class AppModule {}
