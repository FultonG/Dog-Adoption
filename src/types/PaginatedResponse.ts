// Generic Paginated Response to handle different types of data
export interface PaginatedResponse<T> {
  resultIds: T[];
  total: number;
  next: string | null;
  prev: string | null;
}