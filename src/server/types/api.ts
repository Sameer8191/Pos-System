export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ApiError = {
  success: false;
  status: string;
  statusCode: number;
  message: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedApiResponse<T> = {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationMeta;
};

export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export type SortQuery = {
  sortBy?: string;
  order?: "asc" | "desc";
};

export type ListQuery = PaginationQuery & SortQuery;

export type SearchQuery = {
  search?: string;
};

export type ResourceQuery = ListQuery & SearchQuery;

export type FilterQuery = {
  status?: string;
};

export type CompleteResourceQuery = ResourceQuery & FilterQuery;