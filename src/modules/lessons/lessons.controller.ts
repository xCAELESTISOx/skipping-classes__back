import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { Lesson } from './lesson.entity';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() lesson: Lesson): Promise<Lesson> {
    return this.lessonsService.create(lesson);
  }

  @Get()
  findAll(
    @Query() query: { startTime?: Date; endTime?: Date },
  ): Promise<Lesson[]> {
    return this.lessonsService.findAll(query.startTime, query.endTime);
  }
}
