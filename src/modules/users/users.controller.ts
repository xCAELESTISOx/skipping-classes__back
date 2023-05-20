import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User): Promise<User> {
    try {
      return this.usersService.create(user);
    } catch (err) {
      console.log(err);
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
