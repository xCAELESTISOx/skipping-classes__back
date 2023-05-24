import { Skip, SkipArgueStatus } from '../skip.entity';

export class CreateSkipDTO implements Omit<Skip, 'id' | 'lesson' | 'student'> {
  status: SkipArgueStatus;
  studentId: number;
}
