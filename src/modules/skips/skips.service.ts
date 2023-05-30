import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { CreateSkipDTO } from './dto/createSkip.dto';
import { Skip, SkipArgueStatus } from './skip.entity';
import { GetSkipsDTO } from './dto/getSkips.dto';

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

  /** Получить список пропусков */
  findAll(skipsData: GetSkipsDTO): Promise<Skip[]> {
    const { studentId, limit = 50, page = 1 } = skipsData;
    const offset = limit * (page - 1);

    let queryBuilder = this.skipsRepository.createQueryBuilder('lesson');

    if (studentId)
      queryBuilder = queryBuilder.where('lesson.studentId = :studentId', {
        studentId,
      });

    return queryBuilder.skip(offset).take(limit).getMany();
  }
}
