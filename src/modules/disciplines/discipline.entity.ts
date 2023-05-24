import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';

@Entity()
export class Discipline {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Lesson, (lesson) => lesson.discipline)
  lessons: Relation<Lesson[]>;
}
