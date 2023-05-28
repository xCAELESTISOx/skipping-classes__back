import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/add-to-group')
  addStudentToGroup(
    @Param('id') id: number,
    @Body('groupId') groupdId: number,
  ) {
    if (!groupdId)
      throw new HttpException(
        'groupId is required',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return this.usersService.addStudentToGroup(id, groupdId);
  }

  @Get()
  findAll(@Query('search') search?: string): Promise<User[]> {
    return this.usersService.findAll(search);
  }
}
