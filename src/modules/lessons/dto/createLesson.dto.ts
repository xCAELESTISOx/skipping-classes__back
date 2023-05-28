import { Group } from '../../groups/group.entity';
import { Lesson } from '../lesson.entity';

interface CreateLessonGroups {
  groupsIds: number[];
}

export class CreateLessonDTO
  implements
    Omit<Lesson, 'id' | 'discipline' | 'skips' | 'groups'>,
    CreateLessonGroups
{
  groups?: Group[];
  disciplineId: number;
  groupsIds: number[];
  time: Date;
}
