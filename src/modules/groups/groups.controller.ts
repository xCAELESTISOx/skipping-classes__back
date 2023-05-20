import { Body, Controller, Get, Post } from '@nestjs/common';

import { GroupsService } from './groups.service';
import { Group } from './group.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() group: Group): Promise<Group> {
    return this.groupsService.create(group);
  }

  @Get()
  findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }
}
