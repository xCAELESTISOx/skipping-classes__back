import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { Lesson } from './lesson.entity';
import { CreateLessonDTO } from './dto/createLesson.dto';
import { Group } from '../groups/group.entity';
import { GetLessonsDTO } from './dto/getLessons.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Group)
    private readonly groupsRepository: Repository<Group>,
  ) {}

  /** Добавить новую пару */
  async create(lesson: CreateLessonDTO): Promise<Lesson> {
    const groups = await this.groupsRepository.findBy({
      id: In(lesson.groupsIds),
    });
    lesson.groups = groups;

    const newLesson = this.lessonsRepository.create(lesson);

    return await this.lessonsRepository.save(newLesson);
  }

  /** Добавить группу к паре */
  async addGroupToLesson(lessonId: number, groupsIds: number[]) {
    const [newGroups, lesson] = await Promise.all([
      this.groupsRepository.findBy({ id: In(groupsIds) }),
      this.lessonsRepository.findOneBy({ id: lessonId }),
    ]);

    if (!lesson)
      throw new HttpException(`Lesson with id ${lessonId} is not found`, 422);

    lesson.groups.push(...newGroups);

    return this.lessonsRepository.update(lessonId, lesson);
  }

  /** Получить список пар */
  async findAll(params: GetLessonsDTO): Promise<Lesson[]> {
    const { startTime, endTime, groupsIds, limit = 50, page = 1 } = params;
    const offset = limit * (page - 1);

    let selectQueryBuilder = this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.discipline', 'discipline')
      .leftJoinAndSelect('lesson.groups', 'group');

    console.log(groupsIds);

    if (groupsIds?.length) {
      selectQueryBuilder = selectQueryBuilder.where(
        'group.id IN (:...groupsIds)',
        { groupsIds },
      );
    }

    if (startTime)
      selectQueryBuilder = selectQueryBuilder.where(
        'lesson.time > :startTime',
        { startTime: new Date(startTime) },
      );

    if (endTime && !startTime)
      selectQueryBuilder = selectQueryBuilder.where('lesson.time < :endTime', {
        endTime: new Date(endTime),
      });

    if (endTime && startTime)
      selectQueryBuilder = selectQueryBuilder.andWhere(
        'lesson.time < :endTime',
        {
          endTime: new Date(endTime),
        },
      );

    const lessons = await selectQueryBuilder.skip(offset).take(limit).getMany();

    return lessons.map((lesson) => ({ ...lesson, disciplineId: undefined }));
  }
}
