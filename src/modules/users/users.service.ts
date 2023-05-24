import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDTO } from './dto/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(user: CreateUserDTO): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(id: number, user: CreateUserDTO): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }

  findAll(search: string, user?: User): Promise<User[]> {
    // return this.usersRepository
    //   .createQueryBuilder('user')
    //   .where('user.title like :search', { search: `%${search}%` })
    //   .orWhere('user.pseudo like :search', { search: `%${search}%` })
    //   .andWhere('user.role = :role', { role: user?.role })
    //   .getMany();

    return this.usersRepository
      .createQueryBuilder('main')
      .leftJoinAndSelect('main.skips', 'skip')
      .getMany();
  }

  findOne(id: number) {
    return this.usersRepository.find({ where: { id } });
  }
}
