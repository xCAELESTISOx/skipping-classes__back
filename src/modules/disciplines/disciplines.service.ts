import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Discipline } from './discipline.entity';
import { CrateDisciplineDTO } from './dto/createDiscipline.dto';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplinesRepository: Repository<Discipline>,
  ) {}

  create(discipline: CrateDisciplineDTO): Promise<Discipline> {
    return this.disciplinesRepository.save(discipline);
  }

  findOne(id: number): Promise<Discipline> {
    return this.disciplinesRepository.findOne({ where: { id } });
  }

  findAll(name?: string): Promise<Discipline[]> {
    return this.disciplinesRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }
}
