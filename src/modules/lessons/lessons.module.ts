import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { Lesson } from './lesson.entity';
import { Group } from '../groups/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lesson, Group])],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
