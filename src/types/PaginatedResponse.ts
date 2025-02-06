export interface PaginatedResponse<T> {
  resultIds: T[];
  total: number;
  next: string | null;
  prev: string | null;
}
