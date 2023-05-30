import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';

import { CreateUserDTO } from './dto/createUser.dto';
import { FindUserDTO } from './dto/findUser.dto';

import { User } from './user.entity';
import { GetUsersListDTO } from './dto/getUsersList.dto';

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

    if (student.role !== 'STUDENT')
      throw new HttpException('Provided User is not a student', 422);

    student.groupId = groupId;
    return this.usersRepository.update(studentId, student);
  }

  async findAll(params: GetUsersListDTO): Promise<User[]> {
    const { groupsIds, limit = 50, page = 1 } = params;
    const offset = limit * (page - 1);

    let queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (groupsIds?.length)
      queryBuilder = queryBuilder.where('user.groupId IN (:...groupsIds)', {
        groupsIds,
      });

    return queryBuilder
      .skip(offset)
      .take(limit)
      .orderBy('user.lastname', 'ASC')
      .getMany();
  }

  async findOne(params: FindUserDTO): Promise<User> {
    const user = await this.usersRepository.findOne({ where: params });

    return user;
  }
}
