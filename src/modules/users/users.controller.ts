import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';

import { GetUsersListDTO } from './dto/getUsersList.dto';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':studentId/add-to-group/:groupId')
  addStudentToGroup(
    @Param('studentId') studentId: number,
    @Param('groupId') groupdId: number,
  ) {
    if (!groupdId)
      throw new HttpException(
        'You must provide groupId',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return this.usersService.addStudentToGroup(studentId, groupdId);
  }

  @Get()
  findAll(@Body() params: GetUsersListDTO): Promise<User[]> {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id?: number, @Body('email') email?: string) {
    const params = { id, email };
    return this.usersService.findOne(params);
  }
}
