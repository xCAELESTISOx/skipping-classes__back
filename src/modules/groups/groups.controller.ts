import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { GroupsService } from './groups.service';
import { Group } from './group.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() group: Group): Promise<Group> {
    return this.groupsService.create(group);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }
}
