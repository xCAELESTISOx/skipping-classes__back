import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { CrateDisciplineDTO } from './dto/createDiscipline.dto';
import { DisciplinesService } from './disciplines.service';
import { Discipline } from './discipline.entity';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  create(@Body() discipline: CrateDisciplineDTO): Promise<Discipline> {
    return this.disciplinesService.create(discipline);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.disciplinesService.findOne(id);
  }

  @Get()
  findAll(@Query('name') name?: string): Promise<Discipline[]> {
    return this.disciplinesService.findAll(name);
  }
}
