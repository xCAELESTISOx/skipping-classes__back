import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Group } from '../groups/group.entity';

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

  @Column()
  role: UserRole;

  @Column({ unique: true, nullable: true })
  email?: string;

  @ManyToOne(() => Group, (group) => group.users)
  @JoinColumn({ name: 'groupId' })
  group?: Relation<Group>;
}
