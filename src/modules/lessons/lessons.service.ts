import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Lesson } from './lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
  ) {}

  create(lesson: Lesson): Promise<Lesson> {
    return this.lessonsRepository.save(lesson);
  }

  findAll(startTime?: Date, endTime?: Date): Promise<Lesson[]> {
    return this.lessonsRepository
      .createQueryBuilder('user')
      .where('user.time >= :startTime', { startTime })
      .andWhere('user.time <= :endTime', { endTime })
      .getMany();
  }
}
