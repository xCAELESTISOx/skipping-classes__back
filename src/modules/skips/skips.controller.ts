import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { CreateSkipDTO } from './dto/createSkip.dto';
import { SkipsService } from './skips.service';
import { Skip } from './skip.entity';
import { UpdateResult } from 'typeorm';

@Controller('skips')
export class SkipsController {
  constructor(private readonly skipsService: SkipsService) {}

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() skip: CreateSkipDTO,
  ): Promise<UpdateResult> {
    return this.skipsService.update(id, skip);
  }
  @Post()
  create(@Body() skip: CreateSkipDTO): Promise<Skip> {
    return this.skipsService.create(skip);
  }

  @Get()
  findAll(): Promise<Skip[]> {
    return this.skipsService.findAll();
  }
}
