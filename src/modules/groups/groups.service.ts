import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

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

  findAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }
}
