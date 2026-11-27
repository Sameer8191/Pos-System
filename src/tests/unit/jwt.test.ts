import { SignJWT } from "jose";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const JWT_SECRET = "test-only-secret-with-at-least-32-bytes-long";
const payload = {
  userId: "user-123",
  organizationId: "org-456",
  role: "ADMIN" as const,
};

describe("JWT utilities", () => {
  beforeEach(() => {
    vi.stubEnv("JWT_SECRET", JWT_SECRET);
    vi.stubEnv("JWT_EXPIRES_IN", "1h");
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("generates a token that verifies to its payload", async () => {
    const { generateToken, verifyToken } = await import("../../server/auth/jwt");

    const token = await generateToken(payload);

    expect(await verifyToken(token)).toEqual(payload);
  });

  it("accepts each supported role", async () => {
    const { generateToken, verifyToken } = await import("../../server/auth/jwt");

    for (const role of ["ADMIN", "MANAGER", "CASHIER"] as const) {
      const token = await generateToken({ ...payload, role });
      await expect(verifyToken(token)).resolves.toEqual({ ...payload, role });
    }
  });

  it("rejects a malformed token", async () => {
    const { verifyToken } = await import("../../server/auth/jwt");

    await expect(verifyToken("not-a-jwt")).rejects.toThrow();
  });

  it("rejects a token signed with a different secret", async () => {
    const { verifyToken } = await import("../../server/auth/jwt");
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode("a-different-secret-that-is-also-long-enough"));

    await expect(verifyToken(token)).rejects.toThrow();
  });

  it("rejects a token with an invalid role", async () => {
    const { verifyToken } = await import("../../server/auth/jwt");
    const token = await new SignJWT({ ...payload, role: "OWNER" })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(JWT_SECRET));

    await expect(verifyToken(token)).rejects.toThrow("Invalid JWT payload");
  });

  it("rejects a token with blank required identifiers", async () => {
    const { verifyToken } = await import("../../server/auth/jwt");
    const token = await new SignJWT({ ...payload, userId: "  " })
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode(JWT_SECRET));

    await expect(verifyToken(token)).rejects.toThrow("Invalid JWT payload");
  });
});
