import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

import { Discipline } from '../disciplines/discipline.entity';
import { Skip } from '../skips/skip.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  time: Date;

  @Column()
  disciplineId: number;

  @ManyToOne(() => Discipline, (discipline) => discipline.lessons)
  @JoinColumn({ name: 'disciplineId' })
  discipline: Relation<Discipline>;

  @ManyToMany(() => Group, (group) => group.lessons, { cascade: true })
  groups: Relation<Group[]>;

  @OneToMany(() => Skip, (skip) => skip.lesson)
  skips: Relation<Skip[]>;
}
