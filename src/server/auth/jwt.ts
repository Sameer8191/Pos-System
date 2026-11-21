import { SignJWT, jwtVerify } from "jose";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

if (new TextEncoder().encode(JWT_SECRET).length < 32) {
  throw new Error("JWT_SECRET must be at least 32 bytes");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export type JWTPayload = {
  userId: string;
  organizationId: string;
  role: Role;
};

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const generateToken = async (payload: JWTPayload): Promise<string> => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secretKey);

  return jwt;
};

const isValidRole = (value: unknown): value is Role => {
  return Object.values(Role).some((role) => role === value);
};

export const verifyToken = async (token: string): Promise<JWTPayload> => {
  const { payload } = await jwtVerify(token, secretKey, {
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

/* if (
  typeof payload.userId !== "string" ||
  payload.userId.trim().length === 0 ||
  typeof payload.organizationId !== "string" ||
  payload.organizationId.trim().length === 0 ||
  typeof payload.role !== "string" ||
  payload.role.trim().length === 0
) {
  throw new Error("Invalid JWT payload");
}
  */
