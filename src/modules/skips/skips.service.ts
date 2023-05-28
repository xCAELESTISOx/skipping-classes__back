import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreateSkipDTO } from './dto/createSkip.dto';
import { Skip, SkipArgueStatus } from './skip.entity';

@Injectable()
export class SkipsService {
  constructor(
    @InjectRepository(Skip)
    private readonly skipsRepository: Repository<Skip>,
  ) {}

  create(skip: CreateSkipDTO): Promise<Skip> {
    return this.skipsRepository.save(skip);
  }

  delete(id: number) {
    return this.skipsRepository.delete(id);
  }

  async updateStatus(id: number, newStatus: SkipArgueStatus) {
    const skip = await this.skipsRepository.findOne({ where: { id } });

    const statusesList = Object.values(SkipArgueStatus);

    if (statusesList.indexOf(newStatus) <= statusesList.indexOf(skip.status))
      throw new HttpException('You can`t move status backward', 422);

    return this.skipsRepository.update(id, { status: newStatus });
  }

  findAll(): Promise<Skip[]> {
    return this.skipsRepository.find();
  }
}
