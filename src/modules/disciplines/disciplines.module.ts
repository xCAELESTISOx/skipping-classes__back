import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { Discipline } from './discipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  providers: [DisciplinesService],
  controllers: [DisciplinesController],
})
export class DisciplinesModule {}
