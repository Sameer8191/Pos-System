export const APP_NAME = "Pos-System";

export const API_VERSION = "v1";

export const API_PREFIX = `/api/${API_VERSION}`;

export const DEFAULT_PAGE = 1;

export const DEFAULT_LIMIT = 10;

export const MAX_LIMIT = 50;

export const DEFAULT_SUCCESS_MESSAGE = "Operation successful";

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;
