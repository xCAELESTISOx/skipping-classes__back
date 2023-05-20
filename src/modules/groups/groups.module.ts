import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
