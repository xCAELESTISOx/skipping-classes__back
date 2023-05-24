import { Discipline } from '../discipline.entity';

export class CrateDisciplineDTO implements Omit<Discipline, 'id' | 'lessons'> {
  name: string;
}
