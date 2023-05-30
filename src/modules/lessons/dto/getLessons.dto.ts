import { Transform } from 'class-transformer';

export class GetLessonsDTO {
  startTime?: Date;
  endTime?: Date;

  @Transform(({ value }) => value.split(',').filter((i) => i && i != 0))
  groupsIds?: number[];

  limit?: number = 50;
  page?: number = 1;
}
