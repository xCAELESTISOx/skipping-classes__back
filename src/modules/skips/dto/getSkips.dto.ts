interface GetSkipsFilters {
  studentId: number;
}

export class GetSkipsDTO {
  filters?: Partial<GetSkipsFilters>;
  limit?: number;
  page?: number;
}
