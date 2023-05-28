import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Lesson } from './lesson.entity';
import { LessonsService } from './lessons.service';
import { CreateLessonDTO } from './dto/createLesson.dto';
import { GetLessonsDTO } from './dto/getLessons.dto';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  create(@Body() lesson: CreateLessonDTO): Promise<Lesson> {
    if (!lesson.groupsIds?.length)
      throw new HttpException('You must provide groupsIds param', 422);

    return this.lessonsService.create(lesson);
  }

  @Put(':id')
  addGroupToLesson(
    @Param('id') id: number,
    @Body('groupsIds') groupsIds: number[],
  ) {
    if (!groupsIds.length)
      throw new HttpException(`You should provide correct groupsIds`, 422);

    return this.lessonsService.addGroupToLesson(id, groupsIds);
  }

  @Get()
  findAll(@Body() params: GetLessonsDTO): Promise<Lesson[]> {
    return this.lessonsService.findAll(params);
  }
}
