
import { describe, it, expect } from "vitest";
import AppError from "../../server/utils/error";

describe("AppError", () => {
  it("sets the error name, message, status code, and operational status", () => {
    const error = new AppError("Not found", 404);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("AppError");
    expect(error.message).toBe("Not found");
    expect(error.statusCode).toBe(404);
    expect(error.status).toBe("fail");
    expect(error.stack).toContain("Not found");
  });

  it("marks server errors with the error status", () => {
    const error = new AppError("Unavailable", 503);

    expect(error.status).toBe("error");
  });
});
