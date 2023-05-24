import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';
import { User } from '../users/user.entity';

export enum SkipArgueStatus {
  UNARGUED = 'UNARGUED',
  WAITING_FOR_CONFIRMATION = 'WAITING_FOR_CONFIRMATION',
  ARGUING_CANCELED = 'ARGUING_CANCELED',
  ARGUED = 'ARGUED',
}

@Entity()
export class Skip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: SkipArgueStatus,
    default: SkipArgueStatus.UNARGUED,
  })
  status: SkipArgueStatus;

  @ManyToOne(() => Lesson, (lesson) => lesson.skips)
  @JoinColumn({ name: 'lessonId' })
  lesson: Relation<Lesson>;

  @Column()
  studentId: number;

  @ManyToOne(() => User, (user) => user.skips)
  @JoinColumn({ name: 'studentId' })
  student: Relation<User>;
}
