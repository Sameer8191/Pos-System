
import { describe, it, expect } from "vitest";
import ApiResponse from "../../server/utils/api-response";

describe("ApiResponse", () => {
  it("stores a success message, payload, and successful status", () => {
    const data = { id: 7 };
    const response = new ApiResponse("Created", data, 201);

    expect(response.success).toBe(true);
    expect(response.message).toBe("Created");
    expect(response.data).toBe(data);
    expect(response.statusCode).toBe(201);
  });

  it("rejects status codes outside the successful HTTP range", () => {
    expect(() => new ApiResponse("Invalid", null, 199))
      .toThrow("Invalid success status code");

    expect(() => new ApiResponse("Invalid", null, 300))
      .toThrow("Invalid success status code");
  });
});
