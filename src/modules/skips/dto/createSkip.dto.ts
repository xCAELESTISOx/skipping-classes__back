import { Skip } from '../skip.entity';

export class CreateSkipDTO
  implements Omit<Skip, 'id' | 'lesson' | 'student' | 'status'>
{
  lessonId: number;
  studentId: number;
}
