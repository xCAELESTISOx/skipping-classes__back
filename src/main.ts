import { NestFactory } from '@nestjs/core';

import { UsersController } from './modules/users/users.controller';
import { User, UserRole } from './modules/users/user.entity';
import { AppModule } from './app.module';

import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  console.log('Nestjs is ready to go!');
}
bootstrap();
