import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Group } from '../groups/group.entity';
import { Skip } from '../skips/skip.entity';
import { Exclude } from 'class-transformer';

export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  middlename: string;

  @Column()
  lastname: string;

  @Column({ default: UserRole.STUDENT })
  role: UserRole;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  groupId?: number;

  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password: string;

  @ManyToOne(() => Group, (group) => group.users)
  @JoinColumn({ name: 'groupId' })
  group?: Relation<Group>;

  @OneToMany(() => Skip, (skip) => skip.student)
  skips: Relation<Skip[]>;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
