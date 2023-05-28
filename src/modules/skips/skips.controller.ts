import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateSkipDTO } from './dto/createSkip.dto';
import { SkipsService } from './skips.service';
import { Skip, SkipArgueStatus } from './skip.entity';
import { UpdateResult } from 'typeorm';

@Controller('skips')
export class SkipsController {
  constructor(private readonly skipsService: SkipsService) {}

  @Post()
  create(@Body() skip: CreateSkipDTO): Promise<Skip> {
    return this.skipsService.create(skip);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body('status') status: SkipArgueStatus,
  ) {
    if (!status) throw new HttpException('Field status is required', 422);

    return this.skipsService.updateStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.skipsService.delete(id);
  }

  @Get()
  findAll(): Promise<Skip[]> {
    return this.skipsService.findAll();
  }
}
