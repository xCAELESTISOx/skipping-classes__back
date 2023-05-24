import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDTO): Promise<User> {
    try {
      return this.usersService.create(user);
    } catch (err) {
      console.log(err);
    }
  }

  @Get()
  findAll(@Query('search') search?: string): Promise<User[]> {
    return this.usersService.findAll(search);
  }
}
