class ApiResponse<T> {
  public readonly success: true = true;
  public readonly message: string;
  public readonly data: T;
  public readonly statusCode: number;

  constructor(message: string, data: T, statusCode: number = 200) {
    if (
      !Number.isInteger(statusCode) ||
      statusCode < 200 ||
      statusCode >= 300
    ) {
      throw new RangeError("Invalid success status code");
    }

    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }
}

export default ApiResponse;
