import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

import { Discipline } from '../disciplines/discipline.entity';
import { Skip } from '../skips/skip.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  time: Date;

  @ManyToOne(() => Discipline, (discipline) => discipline.lessons)
  @JoinColumn({ name: 'disciplineId' })
  discipline: Relation<Discipline>;

  @OneToMany(() => Skip, (skip) => skip.lesson)
  skips: Relation<Skip[]>;
}
