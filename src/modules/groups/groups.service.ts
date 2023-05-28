import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';

import { Group } from './group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  create(group: Group): Promise<Group> {
    return this.groupsRepository.save(group);
  }

  findOne(id: number): Promise<Group> {
    return this.groupsRepository.findOne({ where: { id } });
  }

  findAll(name?: string): Promise<Group[]> {
    return this.groupsRepository.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
    });
  }
}
