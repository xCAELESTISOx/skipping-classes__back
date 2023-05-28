interface LessonsFilters {
  startTime: Date;
  endTime: Date;
  groupsIds: number[];
}

export class GetLessonsDTO {
  public filters?: Partial<LessonsFilters>;

  public limit?: number = 50;
  public page?: number = 1;
}
