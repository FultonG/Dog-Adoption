export type PaginationState<T> = {
  data: T[];
  total: number;
  next: string | boolean | null;
  prev: string | boolean | null;
  loading: boolean;
  error: string | null;
  size: number;
};
