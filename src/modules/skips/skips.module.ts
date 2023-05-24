import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skip } from './skip.entity';
import { SkipsService } from './skips.service';
import { SkipsController } from './skips.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Skip])],
  providers: [SkipsService],
  controllers: [SkipsController],
})
export class SkipsModule {}
