import { NestFactory } from '@nestjs/core';

import { UsersController } from './modules/users/users.controller';
import { User, UserRole } from './modules/users/user.entity';
import { AppModule } from './app.module';

import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  // const user = new User();

  // const userController = app.get(UsersController);

  // user.firstname = 'asd';
  // user.middlename = 'asd';
  // user.lastname = 'asdasd';
  // user.role = UserRole.ADMIN;

  // try {
  //   console.log(userController.create(user));
  // } catch (err) {
  //   console.error(err);
  // }

  console.log('Nestjs is ready to go!');
}
bootstrap();
