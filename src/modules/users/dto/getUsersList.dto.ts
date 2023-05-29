export interface GetUsersListFilters {
  groupsIds: number[];
}

export class GetUsersListDTO {
  filters?: Partial<GetUsersListFilters>;
  limit?: number;
  page?: number;
}
