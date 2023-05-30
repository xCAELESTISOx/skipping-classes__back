import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';

import 'reflect-metadata';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(6060);
  console.log('Nestjs is ready to go!');
}

bootstrap();
