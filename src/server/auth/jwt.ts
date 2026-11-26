import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { VALID_ROLES } from "./rbac";
import type { Role } from "./rbac";

let cachedSecretKey: Uint8Array | null = null;

const getSecretKey = (): Uint8Array => {
  if (cachedSecretKey) return cachedSecretKey;

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const encoded = new TextEncoder().encode(secret);
  if (encoded.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 bytes");
  }

  cachedSecretKey = encoded;
  return cachedSecretKey;
};

export type JWTPayload = {
  userId: string;
  organizationId: string;
  role: Role;
};

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generateToken = async (payload: JWTPayload): Promise<string> => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getSecretKey());
};

const isValidRole = (value: unknown): value is Role => {
  return (
    typeof value === "string" &&
    (VALID_ROLES as readonly string[]).includes(value)
  );
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, getSecretKey(), {
    algorithms: ["HS256"],
  });

  if (
    typeof payload.userId !== "string" ||
    payload.userId.trim().length === 0 ||
    typeof payload.organizationId !== "string" ||
    payload.organizationId.trim().length === 0 ||
    !isValidRole(payload.role)
  ) {
    throw new Error("Invalid JWT payload");
  }

  return {
    userId: payload.userId,
    organizationId: payload.organizationId,
    role: payload.role,
  };
};