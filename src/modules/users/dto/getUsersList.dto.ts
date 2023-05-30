import { Transform } from 'class-transformer';

export class GetUsersListDTO {
  @Transform(({ value }) => value.split(',').filter((i) => i && i != 0))
  groupsIds?: number[];
  limit?: number;
  page?: number;
}
