import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDTO } from './dto/createUser.dto';
import { FindUserDTO } from './dto/findUser.dto';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(userData: CreateUserDTO): Promise<User> {
    const user = this.usersRepository.create(userData);

    return this.usersRepository.save(user);
  }

  update(id: number, user: CreateUserDTO): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }

  async addStudentToGroup(
    studentId: number,
    groupId: number,
  ): Promise<UpdateResult> {
    const student = await this.usersRepository.findOne({
      where: { id: studentId },
    });

    if (student.role !== 'STUDENT') throw new Error('User is not a student');

    student.groupId = groupId;
    return this.usersRepository.update(studentId, student);
  }

  async findAll(search: string, user?: User): Promise<User[]> {
    // return this.usersRepository
    //   .createQueryBuilder('user')
    //   .where('user.title like :search', { search: `%${search}%` })
    //   .orWhere('user.pseudo like :search', { search: `%${search}%` })
    //   .andWhere('user.role = :role', { role: user?.role })
    //   .getMany();

    const users = await this.usersRepository
      .createQueryBuilder('main')
      .leftJoinAndSelect('main.skips', 'skip')
      .getMany();

    users.forEach((user) => {
      delete user.password;
    });

    return users;
  }

  async findOne(params: FindUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({ where: params });

    return user;
  }
}
