class AppError extends Error {
  statusCode: number;
  status: "fail" | "error";
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.status =  statusCode < 500 ? "fail" : "error"
    Error.captureStackTrace(this, AppError);
  }
}

export default AppError;

/* 

class AppError extends Error {
  public readonly statusCode: number;
  public readonly status: "fail" | "error";
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? "fail" : "error";
    this.isOperational = isOperational;

    Error.captureStackTrace?.(this, this.constructor);
  }
}

export default AppError;

*/
