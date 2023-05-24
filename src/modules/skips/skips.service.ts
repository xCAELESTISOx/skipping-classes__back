import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreateSkipDTO } from './dto/createSkip.dto';
import { Skip } from './skip.entity';

@Injectable()
export class SkipsService {
  constructor(
    @InjectRepository(Skip)
    private readonly skipsRepository: Repository<Skip>,
  ) {}

  update(id: number, skip: CreateSkipDTO): Promise<UpdateResult> {
    return this.skipsRepository.update(id, skip);
  }

  create(skip: CreateSkipDTO): Promise<Skip> {
    return this.skipsRepository.save(skip);
  }

  findAll(): Promise<Skip[]> {
    return this.skipsRepository.find();
  }
}
