import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app.module';
import {customExceptionFactory} from './helpers/exception.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: customExceptionFactory,
      stopAtFirstError: true
    })
  );
  await app.listen(3000);
}

bootstrap();
