import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Lesson } from '../lessons/lesson.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Lesson, (lesson) => lesson.groups)
  @JoinTable()
  lessons: Relation<Lesson[]>;

  @OneToMany(() => User, (user) => user.group)
  users: Relation<User[]>;
}
