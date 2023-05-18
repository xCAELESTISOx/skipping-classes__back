import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await AppDataSource.initialize();
  console.log('TypeORM has been initialized.');

  await app.listen(3000);
  console.log('Nestjs is ready to go!');
}
bootstrap();
